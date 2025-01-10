<script setup lang="ts">

import { onMounted, watch, ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { getTransaction } from '@/api/transaction'
import { store } from '@/composables/store'
import { getCoin } from '@/api/coins'
import { useUcFirst } from '@/composables/useUcFirst'

import PortfolioInfoBlock from '@/components/portfolio/PortfolioInfoBlock.vue'
import PieChart from '@/components/charts/PieChart.vue'
import LineChart from '@/components/charts/LineChart.vue'

import type { TypeTransaction } from "@/types/TypeTransaction"
import type { TypeCoin } from '@/types/TypeCoin'
import type { IPane } from '@/interfaces/IPane'

interface Props {
  panes: IPane[]
}

const props = defineProps<Props>()
const transactions = defineModel<TypeTransaction[]>({ required: true })
const assets = ref<TypeTransaction[]>([])
const coins = ref<TypeCoin[]>([])
const loading = ref(false)

const percentDifferrence = (a: number, b: number) => +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
const portfolioName = (portfolioId: string) => props.panes.find(pane => pane.key === portfolioId)?.title

const summValues = (transactions: TypeTransaction[], key: keyof TypeTransaction) => {
  return transactions
    .map((transaction) => {
      const value = transaction[key]
      return typeof value === 'number' ? value : 0 // Проверяем, является ли значение числом
    })
    .reduce((acc: number, v: number) => acc + v, 0) // Суммируем значения
    .toFixed(2) // Форматируем результат до двух знаков после запятой
}

const topGainer = (assets: TypeTransaction[]): TypeTransaction | undefined => {
  if (assets.length === 0) return undefined

  return assets.reduce((max, asset) => (asset.totalProfit || 0) > (max.totalProfit || 0) ? asset : max, assets[0])
}

const groupedTransactions = computed(() => {
  const groupedTransactions: Record<string, TypeTransaction[]> = assets.value.reduce((acc: Record<string, TypeTransaction[]>, c: TypeTransaction) => {
    const prefix: string = c.portfolioId
    acc[prefix] = [...(acc[prefix] ?? []), c]
    return acc
  }, {})

  return Object.values(groupedTransactions)
})

const mapAssets = () => {
  assets.value = transactions.value.map((asset) => {
    const coin = coins.value.find(c => c.id === asset.coinId)

    if (coin) {
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifferrence(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        priceChange24h: (coin.price - asset.price) * asset.amount,
        priceChange24hInPercents: ((coin.price - asset.price) / asset.price) * 100,
        ...asset,
      }
    }
    return asset
  })
}

onMounted(async () => {
  try {
    loading.value = true
    const { data } = await getTransaction(store.userData?.data.id)
    transactions.value = data
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
})

watch(transactions, async () => {
  loading.value = true
  for (const el of transactions.value) {
    const currentCoinExists = coins.value.some(coin => coin.id === el.coinId)

    if (currentCoinExists) {
      continue
    }

    try {
      const { data } = await getCoin(el.coinId)
      coins.value.push(data)
    } catch (error) {
      message.error('Something went wrong, try again later please')
      throw error
    }
  }
  mapAssets()
  loading.value = false
}, { deep: true })

</script>

<template>
  <a-spin :spinning="loading">
    <div
      v-if="transactions.length > 0"
      :style="{ minHeight: '330px' }"
    >
      <div
        v-for="(transactions, index) in groupedTransactions"
        :key="index"
        :style="{ marginBottom: '40px' }"
      >
        <a-typography-title
          :level="2"
          :style="{ margin: '0 0 20px' }"
        >
          {{ portfolioName(transactions[0].portfolioId) }}
        </a-typography-title>
        <a-row :gutter="[16, 16]">
          <a-col
            :xs="24"
            :md="12"
            :lg="8"
            :xl="6"
          >
            <div class="portfolio-col">
              <a-typography-title
                :level="4"
                :style="{ margin: '0' }"
              >
                ${{ summValues(transactions, 'totalAmount') }}
              </a-typography-title>
              <a-typography-text
                type="secondary"
                strong
              >
                Current balance
              </a-typography-text>
            </div>
          </a-col>
          <a-col
            :xs="24"
            :md="12"
            :lg="8"
            :xl="6"
          >
            <div class="portfolio-col">
              <a-typography-title
                :level="4"
                :style="{ margin: '0', color: transactions.some(transaction => transaction.grow) ? '#389e0d' : '#cf1322' }"
              >
                ${{ summValues(transactions, 'priceChange24h') }}
              </a-typography-title>
              <a-typography-text
                type="secondary"
                strong
              >
                24h Portfolio Change
              </a-typography-text>
              <a-tag :color="transactions.some(transaction => transaction.grow) ? 'green' : 'red'">
                {{ summValues(transactions, 'priceChange24hInPercents') }} %
              </a-tag>
            </div>
          </a-col>
          <a-col
            :xs="24"
            :md="12"
            :lg="8"
            :xl="6"
          >
            <div class="portfolio-col">
              <a-typography-title
                :level="4"
                :style="{ margin: '0', color: transactions.some(transaction => transaction.grow) ? '#389e0d' : '#cf1322' }"
              >
                ${{ summValues(transactions, 'totalProfit') }}
              </a-typography-title>
              <a-typography-text
                type="secondary"
                strong
              >
                Total Profit / Loss
              </a-typography-text>
              <a-tag :color="transactions.some(transaction => transaction.grow) ? 'green' : 'red'">
                {{ summValues(transactions, 'growPercent') }} %
              </a-tag>
            </div>
          </a-col>
          <a-col
            :xs="24"
            :md="12"
            :lg="8"
            :xl="6"
          >
            <div class="portfolio-col">
              <a-flex
                gap="small"
                align="center"
                horizontal
                style="margin-bottom: 4px"
              >
                <img
                  :src="topGainer(transactions)?.coinIcon"
                  :alt="topGainer(transactions)?.coinName"
                  width="24"
                  height="24"
                >
                <a-typography-text strong>{{ useUcFirst(topGainer(transactions)?.coinName) }}</a-typography-text>
                <a-typography-text
                  type="secondary"
                  strong
                >
                  {{ topGainer(transactions)?.coinSymbol.slice(0, 3).toUpperCase() }}
                </a-typography-text>
              </a-flex>
              <a-typography-text
                type="secondary"
                strong
              >
                Top Gainer (24h)
              </a-typography-text>
              <a-tag :color="transactions.some(transaction => transaction.grow) ? 'green' : 'red'">
                ${{ topGainer(transactions)?.totalProfit?.toFixed(0) }}
              </a-tag>
            </div>
          </a-col>
        </a-row>
        <a-row
          :gutter="[16, 16]"
          style="margin-top: 15px"
        >
          <a-col
            :xs="24"
            :lg="12"
          >
            <div class="portfolio-col">
              <pie-chart
                :data="transactions.map(t => t.totalAmount ?? 0)"
                :labels="transactions.map(t => t.coinName ?? '')"
              />
            </div>
          </a-col>
          <a-col
            :xs="24"
            :lg="12"
          >
            <div class="portfolio-col">
              <line-chart :transactions="transactions" />
            </div>
          </a-col>
        </a-row>
        <div>
        </div>
      </div>
    </div>
    <portfolio-info-block
      v-else
      img-url="/crypto/no-manual-portfolio.png"
      text="Add transactions to your coins to easily track your<br> holdings, performance, and profit & losses."
    />
  </a-spin>
</template>

<style scoped>
.portfolio-col {
  padding: 20px 20px;
  border-radius: 8px;
  border: 1px solid #0505050f;
  height: 100%;
}
</style>