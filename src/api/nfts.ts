import axios from 'axios'
import { store } from '../composables/store'
import type { TypeQueryParams } from '../types/TypeQueryParams'
import type { TypeMeta } from '../types/TypeMeta'
import type { TypeNft } from '../types/TypeNft'

type TypeData = {
  data: TypeNft[],
  meta: TypeMeta,
}

export const getNfts = (params: TypeQueryParams) => {
  return axios.get<TypeData>(`${store.API_URL}/nft/trending`, {
    headers: store.headers,
    params,
  })
}