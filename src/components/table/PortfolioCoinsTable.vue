<script setup lang="ts">

import { computed, ref, watch, h } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getCoin } from '@/api/coins'
import { useUcFirst } from '@/composables/useUcFirst'
import { useNumberWithSpaces } from '@/composables/useNumberWithSpaces'
import { deletePortfolioCoin } from '@/api/portfolio'

import type { TypePortfolioCoin } from '@/types/TypePortfolioCoin'
import type { TypeCoin } from '@/types/TypeCoin'
import type { TableColumnsType } from 'ant-design-vue'

import PortfolioInfoBlock from '@/components/PortfolioInfoBlock.vue'

interface Props {
  portfolioId: string
  portfoliosCoins: TypePortfolioCoin[]
}

const { portfolioId, portfoliosCoins } = defineProps<Props>()
const addTransactionPortfolioModalOpen = defineModel('addTransactionPortfolioModalOpen')
const transactionCoin = defineModel('transactionCoin')
const coinsIds = computed<TypePortfolioCoin[]>(() => portfoliosCoins.filter(el => el.portfolioId === +portfolioId))
const coins = ref<TypeCoin[]>([])
const pagesize = ref(100)
const pageTable = ref(1)
const loading = ref(false)

const removePortfolioCoin = async (coinId: number, coinName: string, id: string) => {
  try {
    loading.value = true
    await deletePortfolioCoin(coinId)
    coins.value = coins.value.filter(coin => coin.id !== id)
    message.success(`${coinName} removed successfully`)
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}

const openTransactionModal = (coin: TypeCoin) => {
  transactionCoin.value = coin
  addTransactionPortfolioModalOpen.value = true
}

const columns: TableColumnsType = [
  {
    title: '#',
    dataIndex: 'Id',
    key: 'Id',
    width: 60,
    customRender: ({ index }) => (pageTable.value - 1) * pagesize.value + (index + 1),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 280,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: '1h %',
    dataIndex: 'priceChange1h',
    key: 'priceChange1h',
    width: 110,
    sorter: (a, b) => a.priceChange1h - b.priceChange1h,
  },
  {
    title: '24h %',
    dataIndex: 'priceChange1d',
    key: 'priceChange1d',
    width: 110,
    sorter: (a, b) => a.priceChange1d - b.priceChange1d,
  },
  {
    title: '7d %',
    dataIndex: 'priceChange1w',
    key: 'priceChange1w',
    width: 110,
    sorter: (a, b) => a.priceChange1w - b.priceChange1w,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    sorter: (a, b) => a.marketCap - b.marketCap,
  },
  {
    title: 'Volume(24h)',
    dataIndex: 'volume',
    key: 'volume',
    sorter: (a, b) => a.volume - b.volume,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    width: 120
  },
]

watch(coinsIds, async () => {
  loading.value = true
  for (const el of coinsIds.value) {
    const currentCoinExists = coins.value.some(coin => coin.id === el.coinId)

    if (currentCoinExists) {
      continue // Пропускаем итерацию, если монета уже существует
    }

    try {
      const { data } = await getCoin(el.coinId)
      data.coinId = el.id
      coins.value.push(data)
    } catch (error) {
      message.error('Something went wrong, try again later please')
      throw error
    }
  }
  loading.value = false
}, { immediate: true })

</script>

<template>
  <a-table
    v-if="coinsIds.length > 0"
    :pagination="{
      pageSize: pagesize,
      showSizeChanger: true,
      total: coins.length,
      showTotal: (total: number, range: number[]) => {
        return `${range[0]}-${range[1]} of ${total} items`
      },
      onChange: (page: number, pageSize: number) => {
        pagesize = pageSize
        pageTable = page
      }
    }"
    :columns="columns"
    :data-source="coins"
    :loading="loading"
    :style="{ marginTop: '20px' }"
    :scroll="{ x: '1270px' }"
  >
    <template #bodyCell="{ text, record, column }">

      <a-flex
        v-if="column.key === 'name'"
        gap="small"
        align="center"
        horizontal
      >
        <img
          :src="record.icon"
          :alt="record.name"
          width="24"
          height="24"
        >
        <a-typography-text strong>{{ useUcFirst(record.name) }}</a-typography-text>
        <a-typography-text
          type="secondary"
          strong
        >
          {{ record.symbol.slice(0, 3).toUpperCase() }}
        </a-typography-text>
      </a-flex>

      <a-typography-text
        v-else-if="column.key === 'price'"
        strong
      >
        ${{ useNumberWithSpaces(text.toFixed(3)) }}
      </a-typography-text>

      <a-typography-text
        v-else-if="column.key === 'marketCap' || column.key === 'volume'"
        strong
      >
        ${{ useNumberWithSpaces(text.toFixed(0)) }}
      </a-typography-text>

      <a-typography-text
        v-else-if="column.key === 'priceChange1h' || column.key === 'priceChange1d' || column.key === 'priceChange1w'"
        strong
      >
        <a-statistic
          :value="Math.abs(text)"
          :precision="2"
          suffix="%"
          :value-style="{ color: text > 0 ? '#3f8600' : '#cf1322', fontSize: '16px' }"
        >
          <template #prefix>
            <arrow-up-outlined v-if="text > 0" />
            <arrow-down-outlined v-else />
          </template>
        </a-statistic>
      </a-typography-text>

      <a-flex
        v-else-if="column.key === 'actions'"
        gap="small"
        align="center"
        horizontal
      >
        <a-popover placement="left">
          <template #content>
            <p>Add transaction</p>
          </template>
          <a-button
            :style="{ border: '0' }"
            :icon="h(PlusOutlined)"
            @click="openTransactionModal(record)"
          />
        </a-popover>
        <a-popconfirm
          title="Are you sure delete this coin?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="removePortfolioCoin(record.coinId, record.name, record.id)"
        >
          <a-button
            :style="{ border: '0' }"
            :icon="h(DeleteOutlined)"
          />
        </a-popconfirm>
      </a-flex>

    </template>
  </a-table>

  <portfolio-info-block
    v-else
    img-url="/crypto/no-manual-portfolio.png"
    title-text="What coins are you researching today?"
    text="Keep track of coins you’re interested<br> in and receive large mover price alerts"
    btn-text="+ Add Coin"
    :title-level="2"
  />
</template>