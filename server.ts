/*
 * @Author: wqhui
 * @Date: 2022-05-31 15:20:18
 * @Description:  app服务启动和服务端渲染处理逻辑
 */
import fs from 'fs'
import path from 'path'

import Koa from 'koa'
import koaConnect from 'koa-connect'
import { createServer as createViteServer, ViteDevServer } from 'vite'

import colors from 'colors'
import child_process from 'child_process'

const SERVER_PORT = 2333
const SERVER_HTML_ERROR = 'server_html_error'

//区分集成生产环境
const IS_PROP: boolean = process.env.NODE_ENV === 'production'

async function createAppServer() {
  const resolve = (p: string) => path.resolve(__dirname, p)

  const app = new Koa()

  let vite: ViteDevServer
  //启动服务
  if (!IS_PROP) {
    //开发模式使用 vite 服务器

    // 以中间件模式创建 Vite 服务器
    vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
    })

    //使用vite服务端渲染中间件
    app.use(koaConnect(vite.middlewares))
  } else {
    //生产模式使用 静态 服务器
    //压缩代码
    app.use((await import('koa-compress')).default())

    //启动静态服务器
    app.use(
      (await import('koa-static')).default(resolve('dist/client'), {
        index: false,
      })
    )
  }

  //处理返回到客户端的html页面
  app.use(async (ctx, next) => {
    const { req } = ctx
    const { url } = req

    try {
      let template: string, render

      if (!IS_PROP) {
        //开发模式

        // 1. 读取 index.html
        //    开发模式总是读取最新的html
        template = fs.readFileSync(
          path.resolve(__dirname, 'index.html'),
          'utf-8'
        )

        // 2. 应用 Vite HTML 转换。
        //    这将会注入 Vite HMR 客户端，
        //    同时也会从 Vite 插件应用 HTML 转换。
        //    例如：@vitejs/plugin-react 中的 global preambles
        template = await vite.transformIndexHtml(url || '', template)

        // 3. 加载服务端入口。
        //    vite.ssrLoadModule 将自动转换
        //    你的 ESM 源码使之可以在 Node.js 中运行！无需打包
        //    并提供类似 HMR 的根据情况随时失效。
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        //生产模式

        //读取打包的模板
        template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')

        //读取打包的服务端入口
        render = (await import(resolve('dist/server/entry-server.js'))).render
      }

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const context: { preloadedState?: string } = {}
      const appHtml = await render(url, context)

      // 5. 注入渲染后的应用程序 HTML 到模板中。
      let html = template

      if (context.preloadedState) {
        //服务端数据注水
        //注意需要在模板字符串中增加一个空的script标签并在内部增加//--script-paclcehoder--//
        html = html.replace(
          `//--script-paclcehoder--//`,
          `window.PRE_LOADED_STATE = ${JSON.stringify(context.preloadedState)}`
        )
      }

      html = html.replace(`<!--app-html-->`, appHtml)

      // 6. 返回渲染后的 HTML。
      ctx.body = html
      ctx.status = 200
      // if(context.status===404){
      //   ctx.status = 404
      // }
    } catch (e: any) {
      if (!IS_PROP) {
        // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
        // 你的实际源码中。
        vite.ssrFixStacktrace(e)
      }
      ctx.app.emit('error', new Error(SERVER_HTML_ERROR), ctx, e)
    }
  })

  app.on('error', (err, ctx, e) => {
    if (err.message === SERVER_HTML_ERROR) {
      //打印错误
      const msg = `[返回HTML页面异常]: ${e.stack}`
      console.error(colors.red(msg))
      ctx.status = 500
      ctx.body = msg
    } else {
      const msg = `[服务器异常]: ${e}`
      console.error(colors.red(msg))
      ctx.status = 500
      ctx.body = msg
    }
  })

  app.listen(SERVER_PORT, () => {
    const url = `http://localhost:${SERVER_PORT}`
    console.log(
      colors.green('[React SSR]启动成功, 地址为:'),
      colors.green.underline(url)
    )
    child_process.exec(`open ${url}`)
  })
}

createAppServer()
