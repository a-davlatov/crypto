import axios from 'axios'
import { store } from '../composables/store'
import type { TypeExchanges } from '@/types/TypeExchanges'

export const getExchanges = () => {
  return axios.get<TypeExchanges>(`${store.API_URL}/tickers/exchanges`, {
    headers: store.headers,
  })
}