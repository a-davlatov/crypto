import axios from 'axios'
import { store } from '../composables/store'
import type { TypeMarketData } from '../types/TypeMarketData'

export const getMarketData = () => {
  return axios.get<TypeMarketData>(`${store.API_URL}/markets`, {
    headers: store.headers,
  })
}