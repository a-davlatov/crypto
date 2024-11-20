<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { getCoins } from '@/api/coins'
import { useNumberWithSpaces } from '@/composables/useNumberWithSpaces'
import { useErrorImage } from '@/composables/useErrorImage'
import { useUcFirst } from '@/composables/useUcFirst'

import type { TableColumnsType } from 'ant-design-vue'
import type { TypeCoin } from '@/types/TypeCoin'

const coins = ref<TypeCoin[]>([])
const totalCoins = ref(1)
const pageSize = ref(100)
const pageTable = ref(1)
const loading = ref<boolean>(false)

const imgUrls: string[] = ['js.jpg', 'antd.png', 'vue.jpg']
const handleErrorImage = useErrorImage(imgUrls)

const columns: TableColumnsType = [
  {
    title: '#',
    dataIndex: 'Id',
    key: 'Id',
    width: 75,
    // sorter: (a, b) => a.Id - b.Id,
    customRender: ({ index }) => (pageTable.value - 1) * pageSize.value + (index + 1),
    // sortDirections: ['descend'],
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 360,
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
    width: 120,
    sorter: (a, b) => a.priceChange1h - b.priceChange1h,
  },
  {
    title: '24h %',
    dataIndex: 'priceChange1d',
    key: 'priceChange1d',
    width: 120,
    sorter: (a, b) => a.priceChange1d - b.priceChange1d,
  },
  {
    title: '7d %',
    dataIndex: 'priceChange1w',
    key: 'priceChange1w',
    width: 120,
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
]

const fetchCoins = async (page?: number, pagesize?: number) => {
  try {
    loading.value = true
    const { data } = await getCoins({ limit: pagesize ? pagesize : 100, page: page ? page : 1, })
    coins.value = data.result
    totalCoins.value = data.meta.itemCount
    if (pagesize) {
      pageSize.value = pagesize
    }
    if (page) {
      pageTable.value = page
    }
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchCoins())

</script>

<template>
  <div class="container">
    <a-table
      sticky
      :pagination="{
        pageSize,
        total: totalCoins,
        showTotal: (total: number, range: number[]) => {
          return `${range[0]}-${range[1]} of ${total} items`
        },
        onChange: (page: number, pageSize: number) => {
          fetchCoins(page, pageSize)
        }
      }"
      :columns="columns"
      :data-source="coins"
      :loading="loading"
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
            @error="handleErrorImage"
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

      </template>
    </a-table>
  </div>
</template>