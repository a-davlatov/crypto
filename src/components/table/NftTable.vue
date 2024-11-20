<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { getNfts } from '@/api/nfts'
import { useUcFirst } from '@/composables/useUcFirst'
import { useErrorImage } from '@/composables/useErrorImage'
import { useNumberWithSpaces } from '@/composables/useNumberWithSpaces.js'

import type { TableColumnsType } from 'ant-design-vue'
import type { TypeNft } from '@/types/TypeNft.ts'

const nfts = ref<TypeNft[]>([])
const totalNfts = ref(1)
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
    width: 80,
    customRender: ({ index }) => (pageTable.value - 1) * pageSize.value + (index + 1),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'floor Price',
    dataIndex: 'floorPriceMc',
    key: 'floorPriceMc',
    width: 180,
    sorter: (a, b) => a.floorPriceMc - b.floorPriceMc,
  },
  {
    title: '24h %',
    dataIndex: 'floorPriceChange24h',
    key: 'floorPriceChange24h',
    width: 160,
    sorter: (a, b) => a.floorPriceChange24h - b.floorPriceChange24h,
  },
  {
    title: 'Volume 24h',
    dataIndex: 'volumeMc24h',
    key: 'volumeMc24h',
    width: 180,
    sorter: (a, b) => a.volumeMc24h - b.volumeMc24h,
  },
  {
    title: 'Owners Count',
    dataIndex: 'ownersCount',
    key: 'ownersCount',
    width: 180,
    sorter: (a, b) => a.ownersCount - b.ownersCount,
  },
]

const fetchNfts = async (page?: number, pagesize?: number) => {
  try {
    loading.value = true
    const { data } = await getNfts({ limit: pagesize ? pagesize : 100, page: page ? page : 1, })
    nfts.value = data.data
    totalNfts.value = data.meta.itemCount
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

onMounted(() => fetchNfts())

</script>

<template>
  <a-table
    sticky
    :pagination="{
      pageSize,
      total: totalNfts,
      showTotal: (total: number, range: number[]) => {
        return `${range[0]}-${range[1]} of ${total} items`
      },
      onChange: (page: number, pageSize: number) => {
        fetchNfts(page, pageSize)
      }
    }"
    :columns="columns"
    :data-source="nfts"
    :loading="loading"
    :scroll="{ x: '1100px' }"
  >
    <template #bodyCell="{ text, record, column }">

      <a-flex
        v-if="column.key === 'name'"
        gap="small"
        align="center"
        horizontal
      >
        <div :style="{ width: '44px', height: '44px', overflow: 'hidden' }">
          <img
            :src="record.img || 'fake-url.jpg'"
            :alt="record.name"
            width="44"
            height="44"
            style="border-radius: 8px"
            @error="handleErrorImage"
          >
        </div>
        <div>
          <a-typography-text
            :style="{ display: 'block', marginBottom: '3px' }"
            strong
          >
            {{ useUcFirst(record.name) }}
          </a-typography-text>
          <a-tag
            :bordered="false"
            :style="{ fontWeight: '500', color: '#64748b' }"
          >
            {{ useUcFirst(record.blockchain) }}
          </a-tag>
        </div>
      </a-flex>

      <div v-if="column.key === 'floorPriceMc' && text != null">
        <a-typography-text strong>
          {{
            `${useNumberWithSpaces(text.toFixed(2))}
             ${record.mainCurrencyId ? 
             record.mainCurrencyId.slice(0, 3).toUpperCase() :
             record.blockchain.slice(0, 3).toUpperCase()}`
          }}
        </a-typography-text>
        <a-typography-paragraph
          type="secondary"
          strong
        >
          ${{ useNumberWithSpaces(record.floorPriceUsd.toFixed(2)) }}
        </a-typography-paragraph>
      </div>

      <a-statistic
        v-if="column.key === 'floorPriceChange24h' && text != null"
        :value="Math.abs(text)"
        :precision="2"
        suffix="%"
        :value-style="{ color: text >= 0 ? '#3f8600' : '#cf1322', fontSize: '16px', fontWeight: '500' }"
      >
        <template #prefix>
          <arrow-up-outlined v-if="text >= 0" />
          <arrow-down-outlined v-else />
        </template>
      </a-statistic>

      <div v-if="column.key === 'volumeMc24h' && text != null">
        <a-typography-text strong>
          {{
            `${useNumberWithSpaces(text.toFixed(2))}
             ${record.mainCurrencyId ?
             record.mainCurrencyId.slice(0, 3).toUpperCase() : 
             record.blockchain.slice(0, 3).toUpperCase()}`
          }}
        </a-typography-text>
        <a-typography-paragraph
          type="secondary"
          strong
        >
          ${{ useNumberWithSpaces(record.volumeUsd24h.toFixed(2)) }}
        </a-typography-paragraph>
      </div>

      <a-typography-text
        v-if="column.key === 'ownersCount' && text != null"
        strong
      >
        {{ useNumberWithSpaces(text) }}
      </a-typography-text>

    </template>
  </a-table>
</template>