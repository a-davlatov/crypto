import axios from "axios"
import { store } from "@/composables/store"
import type { TypePortfolioName } from '@/types/TypePortfolioName'
import type { TypePortfolioCoin } from "@/types/TypePortfolioCoin"

type TypePortfolio = {
  id: number,
  portfolioName: string,
  user_id: number
}

export const createPortfolio = (portfolioName: TypePortfolioName) => {
  return axios.post<TypePortfolio>(`${store.MOKKY_API_URL}/portfolios`, portfolioName, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const getPortfolios = () => {
  return axios.get<TypePortfolio[]>(`${store.MOKKY_API_URL}/portfolios?user_id=${store.userData?.data.id}`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const deletePortfolio = (portfolioId: number) => {
  return axios.delete(`${store.MOKKY_API_URL}/portfolios/${portfolioId}`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const changePortfolioName = (portfolioId: number, portfolioName: TypePortfolioName) => {
  return axios.patch(`${store.MOKKY_API_URL}/portfolios/${portfolioId}`, portfolioName, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const addCoinToPortfolio = (data: TypePortfolioCoin) => {
  return axios.post<TypePortfolioCoin>(`${store.MOKKY_API_URL}/portfolio_coins`, data, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const getPortfoliosCoins = () => {
  return axios.get<TypePortfolioCoin[]>(`${store.MOKKY_API_URL}/portfolio_coins?user_id=${store.userData?.data.id}`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}

export const deletePortfolioCoin = (coinId: number) => {
  return axios.delete(`${store.MOKKY_API_URL}/portfolio_coins/${coinId}`, {
    headers: {
      'Authorization': `Bearer ${store.userData?.token}`
    }
  })
}