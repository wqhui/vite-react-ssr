/*
 * @Author: wqhui
 * @Date: 2022-05-31 19:09:31
 * @Description:  客户端入口文件
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { getClientStore } from './store'

function render() {
  const store = getClientStore()
  ReactDOM.hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root')
  )
}

render()
