import { Dispatch as _Dispatch } from '@reduxjs/toolkit'

export interface StoreRecord {
  [key: string]: any
}
export interface ActionType {
  [key: string]: any
}
export interface ContextType {
  [key: string]: any
}
export interface PreLoadState {
  [key: string]: any
}
export interface ActionData {
  payload: any
  type: string
}

export type Dispatch = _Dispatch
