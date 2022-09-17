/*
 * @Author: wqhui
 * @Date: 2022-05-31 19:09:40
 * @Description:  服务端入口文件
 */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { routes } from './router/routerConfig'
import { matchRoutes, RouteMatch } from 'react-router-dom'

import App from './App'
import { getServerStore } from './store'
import { Dispatch, ContextType, StoreRecord } from './interface'

export async function render(url: string, context: ContextType) {
  const routeMatch = matchRoutes(routes, url)
  const store = getServerStore()
  await getServerData(routeMatch, store.dispatch)
  updateContext(context, routeMatch, store)

  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  )
}

function updateContext(
  context: ContextType,
  routeMatch: RouteMatch<string>[] | null,
  store: StoreRecord
) {
  context.status = routeMatch ? 200 : 400
  context.preloadedState = store.getState()
}

async function getServerData(
  routeMatch: RouteMatch<string>[] | null,
  dispatch: Dispatch
) {
  if (routeMatch) {
    const { route } = routeMatch[routeMatch.length - 1]
    const { element } = route
    const getInitialProps = (element as any)?.type?.getInitialProps
    if (getInitialProps) {
      const ctx = {}
      const data = await getInitialProps(ctx)
      dispatch(data)
      return data
    }
  }
  return null
}
