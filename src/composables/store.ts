import { reactive } from 'vue'
import type { TypeUserResponse } from '@/types/TypeUser'
import type { TypeExchanges } from '@/types/TypeExchanges'

type TypeStore = {
  API_URL: string,
  MOKKY_API_URL: string,
  headers: {
    accept: string,
    'X-API-KEY': string
  },
  signedIn: boolean,
  userData: TypeUserResponse | null,
  exchanges: TypeExchanges | null,
  headerModal: {
    isModalVisible: boolean,
    activeTabKey: string
  },
}

export const store: TypeStore = reactive({
  API_URL: 'https://openapiv1.coinstats.app',
  MOKKY_API_URL: 'https://05252fe5d5d47fd2.mokky.dev',
  headers: {
    accept: 'application/json',
    'X-API-KEY': '9GYnh8T8IvcM4M/Q97R8K3hsPrS0sFQWnU9Fgj+j9xg='
  },
  signedIn: false,
  userData: null,
  exchanges: null,
  headerModal: {
    isModalVisible: false,
    activeTabKey: '1'
  },
})