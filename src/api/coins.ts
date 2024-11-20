import axios from 'axios'
import { store } from '../composables/store'
import type { TypeCoin } from '../types/TypeCoin.ts'
import type { TypeQueryParams } from '../types/TypeQueryParams'
import type { TypeMeta } from '../types/TypeMeta'

type TypeData = {
  result: TypeCoin[],
  meta: TypeMeta,
}

export const getCoins = (params: TypeQueryParams) => {
  return axios.get<TypeData>(`${store.API_URL}/coins?currency=USD`, {
    headers: store.headers,
    params,
  })
}

export const getCoin = (coinId: string) => {
  return axios.get<TypeCoin>(`${store.API_URL}/coins/${coinId}?currency=USD`, {
    headers: store.headers
  })
}

export const getCoinCharts = (coinId: string, period: string) => {
  return axios.get(`${store.API_URL}/coins/${coinId}/charts?period=${period}`, {
    headers: store.headers
  })
}