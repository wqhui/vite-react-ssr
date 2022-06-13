import { createSlice, configureStore } from '@reduxjs/toolkit'

import { StoreRecord } from '../interface'

const INIT_STOTE : StoreRecord = {};

const storeSlice = createSlice({
  name: 'state',
  initialState: INIT_STOTE,
  reducers: {
    setStoreProp: (state, action) => {
      state[action.payload.key] = action.payload.value
    }
  }
})


export const getServerStore = () => configureStore({
  reducer: storeSlice.reducer
})

export const getClientStore = () => {
  //客户端数据脱水，获取服务端缓存的数据
  const preloadedState = window.PRE_LOADED_STATE
  return configureStore({
    reducer: storeSlice.reducer,
    preloadedState: preloadedState || {}
  })
}
