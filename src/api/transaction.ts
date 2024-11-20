import axios from "axios"
import { store } from "@/composables/store"

import type { TypeTransaction } from "@/types/TypeTransaction"

export const postTransaction = (transaction: TypeTransaction) => {
  return axios.post<TypeTransaction>(`${store.MOKKY_API_URL}/transactions`, transaction, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const getTransaction = (user_id: number | undefined) => {
  return axios.get<TypeTransaction[]>(`${store.MOKKY_API_URL}/transactions?user_id=${user_id}`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}