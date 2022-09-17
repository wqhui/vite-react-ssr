# Vite Typescript React 17 SSR

一个基于 Vite 和 Koa 的 React SSR 项目。

* [React 17](https://reactjs.org/blog/2020/10/20/react-v17.html)
* [Typescript 4.6](https://devblogs.microsoft.com/typescript/announcing-typescript-4-6-rc/)
* [Vite with Vite SSR](https://vitejs.dev/guide/ssr.html)
* [Koa](https://koajs.com/)
* [React-Router 6](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
* [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/)
* [Less](https://lesscss.org/) & [Stylelint](https://stylelint.io/)

## 开发模式

```
npm run dev
```

这会启动一个`vite`服务，链接为: http://localhost:2333

## 生产模式

```
npm run serve
```

这会先执行 `npm run build` 将代码打包到 `dist` 文件夹，包含 `dist/client` 和 `dist/server` ，随后启动 `Koa` 静态服务，链接为: http://localhost:2333

## 文件

`index.html` - `vite` 入口文件，包括客户端的入口引用

`prerender.ts` - 预渲染 HTML

`server.ts` - 具有服务端渲染的应用服务器

`src/entry-client.tsx` - 客户端渲染入口，将应用挂载到一个 DOM 元素上

`src/entry-server.tsx` - 服务端渲染入口，使用`React`框架的 SSR API 渲染该应用

`src/App.tsx` - `React`应用主入口

`src/pages` - 不同路由的页面文件夹

`.eslintrc.js` - `ESLint` 配置

`.prettierrc.js` - `Prettier` 配置

`stylelint.config.js` - `Stylelint` 配置

`tsconfig.json` - `TypeScript` 配置

`vite.config.ts` - `Vite` 配置

## TODO

- 支持单元测试 


