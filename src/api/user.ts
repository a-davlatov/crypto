import axios from "axios"
import { store } from "../composables/store"
import type { TypeUser } from "../types/TypeUser"
import type { TypeUserResponse } from "../types/TypeUser"

export const registerUser = (userData: TypeUser) => {
  return axios.post<TypeUserResponse>(`${store.MOKKY_API_URL}/register`, userData)
}

export const loginUser = (userData: TypeUser) => {
  return axios.post<TypeUserResponse>(`${store.MOKKY_API_URL}/auth`, userData)
}

type TypeAuthUser = {
  email: string,
  id: number,
  username: string,
}

export const authUser = () => {
  return axios.get<TypeAuthUser>(`${store.MOKKY_API_URL}/auth_me`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const patchUser = (userData: TypeUser) => {
  return axios.patch(`${store.MOKKY_API_URL}/users/${store.userData?.data.id}`, userData, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}