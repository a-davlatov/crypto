export type TypeTransaction = {
  portfolioId: string,
  coinId: string,
  coinName: string,
  coinSymbol: string,
  coinIcon: string,
  amount: number,
  total: number,
  price: number,
  date: string,
  id?: number,
  user_id?: number,
  grow?: boolean,
  growPercent?: number,
  totalAmount?: number,
  totalProfit?: number,
  priceChange24h?: number,
  priceChange24hInPercents?: number,
}