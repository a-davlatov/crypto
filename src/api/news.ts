import axios from 'axios'
import { store } from '../composables/store'
import type { TypeNews } from '../types/TypeNews'
import type { TypeQueryParams } from '../types/TypeQueryParams'

export const getNews = (params: TypeQueryParams) => {
  return axios.get<{ result: TypeNews[] }>(`${store.API_URL}/news`, {
    headers: store.headers,
    params,
  })
}