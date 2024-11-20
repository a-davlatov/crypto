<script setup lang="ts">

import { computed, ref } from 'vue'
import { store } from '@/composables/store'
import { useErrorImage } from '@/composables/useErrorImage'
import { useNumberWithSpaces } from '@/composables/useNumberWithSpaces'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import type { TableColumnsType } from 'ant-design-vue'

const pagesize = ref(100)
const pageTable = ref(1)
const total24hVolume = computed(() => (store.exchanges?.reduce((a, b) => (a + b.volume24h), 0)))

const imgUrls: string[] = ['js.jpg', 'antd.png', 'vue.jpg']
const handleErrorImage = useErrorImage(imgUrls)

const columns: TableColumnsType = [
  {
    title: '#',
    dataIndex: 'Id',
    key: 'Id',
    width: 65,
    customRender: ({ index }) => (pageTable.value - 1) * pagesize.value + (index + 1),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Volume 24h',
    dataIndex: 'volume24h',
    key: 'volume24h',
    sorter: (a, b) => a.volume24h - b.volume24h,
  },
  {
    title: 'Volume 7d',
    dataIndex: 'volume7d',
    key: 'volume7d',
    sorter: (a, b) => a.volume7d - b.volume7d,
  },
  {
    title: 'Change 24h',
    dataIndex: 'change24h',
    key: 'change24h',
    width: 160,
    sorter: (a, b) => a.change24h - b.change24h,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    width: 120,
    sorter: (a, b) => a.rank - b.rank,
  },
]

</script>

<template>
  <a-layout-content>
    <div class="container">
      <a-typography-title
        :level="2"
        :style="{ marginTop: '0' }"
      >
        Top Crypto Exchanges Ranked by
        VueCrypto
      </a-typography-title>
      <a-typography-paragraph
        :style="{ margin: '20px 0' }"
        type="secondary"
      >
        VueCrypto ranks and scores exchanges based on traffic, liquidity, trading volumes, and confidence in the
        legitimacy of trading volumes reported. We now track
        <a-tag color="processing">{{ store.exchanges?.length }}</a-tag>exchanges with a total 24h volume of
        <a-tag
          color="success"
          v-if="total24hVolume"
        >
          ${{ useNumberWithSpaces(total24hVolume) }}
        </a-tag>
      </a-typography-paragraph>

      <a-table
        sticky
        :pagination="{
          pageSize: pagesize,
          showSizeChanger: true,
          total: store.exchanges?.length,
          showTotal: (total: number, range: number[]) => {
            return `${range[0]}-${range[1]} of ${total} items`
          },
          onChange: (page: number, pageSize: number) => {
            pagesize = pageSize
            pageTable = page
          }
        }"
        :columns="columns"
        :data-source="store.exchanges"
        :scroll="{ x: '1000px' }"
      >
        <template #bodyCell="{ text, record, column }">

          <a-flex
            v-if="column.key === 'name'"
            gap="small"
            align="center"
            horizontal
          >
            <div :style="{ width: '24px', height: '24px', overflow: 'hidden' }">
              <img
                :src="record.icon || 'fake-url.jpg'"
                :alt="record.name"
                width="24"
                height="24"
                style="border-radius: 8px"
                @error="handleErrorImage"
              >
            </div>
            <a-typography-text strong>{{ text }}</a-typography-text>
          </a-flex>

          <a-typography-text
            v-else-if="column.key === 'volume24h' || column.key === 'volume7d'"
            strong
          >
            ${{ useNumberWithSpaces(text.toFixed(0)) }}
          </a-typography-text>

          <a-statistic
            v-else-if="column.key === 'change24h'"
            :value="Math.abs(text)"
            :precision="2"
            suffix="%"
            :value-style="{ color: text > 0 ? '#3f8600' : '#cf1322', fontSize: '16px', fontWeight: '500' }"
          >
            <template #prefix>
              <arrow-up-outlined v-if="text > 0" />
              <arrow-down-outlined v-else />
            </template>
          </a-statistic>

          <a-typography-text
            v-else-if="column.key === 'rank'"
            strong
          >
            {{ text }}
          </a-typography-text>

        </template>
      </a-table>
    </div>
  </a-layout-content>
</template>