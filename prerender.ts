/*
 * @Author: wqhui
 * @Date: 2022-06-04 20:20:59
 * @Description:  预先可获得数据的页面，可以先生成静态HTML页面
 */
import fs from 'fs'
import path from 'path'

const absolute = (p: string) => path.resolve(__dirname, p)

const template: string = fs.readFileSync(
  absolute('dist/static/index.html'),
  'utf-8'
)

// 判断那些页面是需要预渲染的
const routesToPrerender = fs.readdirSync(absolute('src/pages')).map((file) => {
  const name = file.replace(/\.tsx$/, '').toLowerCase()
  return name === 'home' ? `/` : `/${name}`
})

async function prerender() {
  // 遍历需要预渲染的页面
  const { render } = await import(absolute('dist/server/entry-server.js'))

  for (const url of routesToPrerender) {
    const context = {}
    const appHtml = await render(url, context)

    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(absolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
}

prerender()
