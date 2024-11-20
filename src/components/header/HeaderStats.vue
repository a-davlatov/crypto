<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import { getMarketData } from '@/api/market'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue'
import { useNumberWithSpaces } from '@/composables/useNumberWithSpaces'
import { getExchanges } from '@/api/exchanges'
import { store } from '@/composables/store'

import type { TypeMarketData } from '@/types/TypeMarketData'

const marketData = ref<TypeMarketData>()

const getGlobalMarketData = async () => {
  try {
    const { data } = await getMarketData()
    marketData.value = data
  } catch (error) {
    throw error
  }
}

const getMyExchanges = async () => {
  try {
    const { data } = await getExchanges()
    store.exchanges = data
  } catch (error) {
    throw error
  }
}

onMounted(() => {
  getGlobalMarketData()
  getMyExchanges()
})

</script>

<template>
  <div class="header__stats">
    <a-flex
      gap="small"
      align="center"
      horizontal
    >
      <a-skeleton-button
        v-if="!marketData"
        active
        :block="true"
        size="small"
        :style="{ width: '100px' }"
      />
      <a-flex
        gap="small"
        align="center"
        horizontal
        v-else
      >
        <a-typography-text
          type="secondary"
          strong
        >
          Exchanges:
        </a-typography-text>
        <a-typography-text strong>{{ store.exchanges?.length }}</a-typography-text>
      </a-flex>
      <a-skeleton-button
        v-if="!marketData"
        active
        :block="true"
        size="small"
        :style="{ width: '272px' }"
      />
      <a-flex
        gap="small"
        align="center"
        horizontal
        :style="{ marginLeft: '10px' }"
        v-else
      >
        <a-typography-text
          type="secondary"
          strong
        >
          Market Cap:
        </a-typography-text>
        <a-typography-text strong>${{ useNumberWithSpaces(marketData.marketCap) }}</a-typography-text>
        <a-statistic
          :value="Math.abs(marketData.marketCapChange)"
          :precision="2"
          suffix="%"
          :value-style="{ color: marketData.marketCapChange > 0 ? '#3f8600' : '#cf1322', fontSize: '14px', fontWeight: '500' }"
        >
          <template #prefix>
            <arrow-up-outlined v-if="marketData.marketCapChange > 0" />
            <arrow-down-outlined v-else />
          </template>
        </a-statistic>
      </a-flex>
      <a-skeleton-button
        v-if="!marketData"
        active
        :block="true"
        size="small"
        :style="{ width: '244px' }"
      />
      <a-flex
        gap="small"
        align="center"
        horizontal
        :style="{ marginLeft: '10px' }"
        v-else
      >
        <a-typography-text
          type="secondary"
          strong
        >
          24h Vol:
        </a-typography-text>
        <a-typography-text strong>${{ useNumberWithSpaces(marketData.volume) }}</a-typography-text>
        <a-statistic
          :value="Math.abs(marketData.volumeChange)"
          :precision="2"
          suffix="%"
          :value-style="{ color: marketData.volumeChange > 0 ? '#3f8600' : '#cf1322', fontSize: '14px', fontWeight: '500' }"
        >
          <template #prefix>
            <arrow-up-outlined v-if="marketData.volumeChange > 0" />
            <arrow-down-outlined v-else />
          </template>
        </a-statistic>
      </a-flex>
      <a-skeleton-button
        v-if="!marketData"
        active
        :block="true"
        size="small"
        :style="{ width: '212px' }"
      />
      <a-flex
        gap="small"
        align="center"
        horizontal
        :style="{ marginLeft: '10px', paddingRight: '15px' }"
        v-else
      >
        <a-typography-text
          type="secondary"
          strong
        >
          Dominance:
        </a-typography-text>
        <a-typography-text strong>BTC {{ marketData.btcDominance }}%</a-typography-text>
        <a-statistic
          :value="Math.abs(marketData.btcDominanceChange)"
          :precision="2"
          suffix="%"
          :value-style="{ color: marketData.btcDominanceChange > 0 ? '#3f8600' : '#cf1322', fontSize: '14px', fontWeight: '500' }"
        >
          <template #prefix>
            <arrow-up-outlined v-if="marketData.btcDominanceChange > 0" />
            <arrow-down-outlined v-else />
          </template>
        </a-statistic>
      </a-flex>
    </a-flex>
  </div>
</template>

<style scoped>
.header__stats {
  white-space: nowrap;
  overflow: auto;
}

</style>