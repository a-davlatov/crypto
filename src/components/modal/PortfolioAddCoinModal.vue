<script setup lang="ts">

import { onMounted, ref, reactive, watch, computed, inject } from 'vue'
import { message } from 'ant-design-vue'
import { CheckCircleOutlined } from '@ant-design/icons-vue'
import { getCoins } from '@/api/coins'
import { useUcFirst } from '@/composables/useUcFirst'
import { addCoinToPortfolio } from '@/api/portfolio'
import debounce from 'lodash.debounce'

import type { UnwrapRef } from 'vue'
import type { TypeCoin } from '@/types/TypeCoin'
import type { TypePortfolioCoin } from '@/types/TypePortfolioCoin'

type TypeAddCoinPortfolioModalOpen = {
  addCoinPortfolioModalOpen: boolean
}

const { addCoinPortfolioModalOpen } = inject<TypeAddCoinPortfolioModalOpen>('addCoinPortfolioModalOpen', { addCoinPortfolioModalOpen: false })
const portfoliosCoins = defineModel<TypePortfolioCoin[]>('portfoliosCoins', { default: [] })
const loading = ref(false)
const portfolioAddToCoins = ref<TypeCoin[]>([])

interface ISearchQuery {
  searchQuery: string
}

interface Props {
  portfolioId: string
}

const props = defineProps<Props>()

const formState: UnwrapRef<ISearchQuery> = reactive({
  searchQuery: '',
})

const coinsIds = computed<TypePortfolioCoin[]>(() => portfoliosCoins.value.filter(el => el.portfolioId === +props.portfolioId))

const isAddedCoin = (coinId: string): boolean => coinsIds.value.some(el => el.coinId === coinId)

const coinClick = async (coinId: string) => {
  if (isAddedCoin(coinId)) {
    message.info(`${useUcFirst(coinId)} already exists in your portfolio`)
    return
  }
  try {
    loading.value = true
    const data = {
      coinId,
      portfolioId: +props.portfolioId
    }
    await addCoinToPortfolio(data)
    portfoliosCoins.value.push(data)
    message.success(`${useUcFirst(coinId)} added to portfolio successfully`)
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const { data } = await getCoins({ limit: 50, page: 1, })
    portfolioAddToCoins.value = data.result
  } catch (error) {
    throw error
  }
})

watch(() => formState.searchQuery, debounce(async () => {
  try {
    loading.value = true
    const { data } = await getCoins({ limit: 50, page: 1, name: formState.searchQuery })
    portfolioAddToCoins.value = data.result
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}, 500))

</script>

<template>
  <a-modal
    v-model:open="addCoinPortfolioModalOpen"
    :footer="null"
    centered
    :style="{ margin: '20px 0', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }"
  >
    <a-spin :spinning="loading">
      <a-typography-title
        :level="4"
        :style="{ marginTop: '0' }"
      >
        Add coins
      </a-typography-title>

      <a-form
        ref="formRef"
        :model="formState"
        :style="{ paddingBottom: '15px', marginBottom: '15px', borderBottom: '1px solid #0505050f' }"
      >
        <a-form-item name="searchQuery">
          <a-input
            v-model:value="formState.searchQuery"
            placeholder="Search"
          >
          </a-input>
        </a-form-item>
      </a-form>

      <ul
        v-if="portfolioAddToCoins.length > 0"
        class="coins-list"
      >
        <li
          v-for="coin in portfolioAddToCoins"
          :key="coin.id"
          @click="coinClick(coin.id)"
        >
          <a-flex
            gap="small"
            align="center"
            horizontal
            justify="space-between"
          >
            <a-flex
              gap="small"
              align="center"
              horizontal
            >
              <img
                :src="coin.icon"
                :alt="coin.name"
                width="24"
                height="24"
              />
              <a-typography-text strong>{{ useUcFirst(coin.name) }}</a-typography-text>
              <a-typography-text
                type="secondary"
                style="white-space: nowrap;"
                strong
              >
                {{ coin.symbol.slice(0, 3).toUpperCase() }}
              </a-typography-text>
            </a-flex>
            <span v-if="isAddedCoin(coin.id)">
              <check-circle-outlined :style="{ color: 'green', fontSize: '18px' }" />
            </span>
          </a-flex>
        </li>
      </ul>

      <a-result
        v-else
        status="404"
        title="Not found"
        sub-title="Sorry, your search didn't match any records."
      >
      </a-result>
    </a-spin>
  </a-modal>
</template>

<style scoped>
.coins-list {
  list-style: none;
  padding: 0;
}

.coins-list li {
  padding: 10px 7px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color .2s linear;
}

.coins-list li:hover {
  background-color: #f5f5f5;
}

@media (max-width: 576px) {
  .coins-list * {
    font-size: 12px;
  }
}
</style>