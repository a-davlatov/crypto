<script setup lang="ts">

import { onMounted, ref, provide } from 'vue'
import { getPortfolios } from '@/api/portfolio'
import { getPortfoliosCoins } from '@/api/portfolio'
import { store } from '@/composables/store'

import type { TypePortfolioCoin } from '@/types/TypePortfolioCoin'
import type { IPane } from '@/interfaces/IPane'
import type { TypeCoin } from '@/types/TypeCoin'
import type { TypeTransaction } from "@/types/TypeTransaction"

import PortfolioInfoBlock from '@/components/PortfolioInfoBlock.vue'
import PortfolioHeader from '@/components/portfolio/PortfolioHeader.vue'
import PortfolioCreateModal from '@/components/modal/PortfolioCreateModal.vue'
import PortfolioDeleteModal from '@/components/modal/PortfolioDeleteModal.vue'
import PortfolioChangeNameModal from '@/components/modal/PortfolioChangeNameModal.vue'
import PortfolioAddCoinModal from '@/components/modal/PortfolioAddCoinModal.vue'
import PortfolioCoinsTable from '@/components/table/PortfolioCoinsTable.vue'
import PortfolioAddTransactionModal from '@/components/modal/PortfolioAddTransactionModal.vue'
import PortfolioOverview from '@/components/portfolio/PortfolioOverview.vue'

const activeKey = ref('first')
const prevActiveKey = ref('')
const createPortfolioModalOpen = ref(false)
const deletePortfolioModalOpen = ref(false)
const changePortfolioNameModalOpen = ref(false)
const addCoinPortfolioModalOpen = ref(false)
const addTransactionPortfolioModalOpen = ref(false)

const transactionCoin = ref<TypeCoin>()
const portfoliosCoins = ref<TypePortfolioCoin[]>([])
const transactions = ref<TypeTransaction[]>([])

const panes = ref<IPane[]>([
  { title: 'Overview', key: 'first' },
  { title: '+ New Portfolio', key: 'last' },
])

const addPane = (name: string, id: number) => {
  panes.value.splice(panes.value.length - 1, 0, { title: name, key: String(id) })
}

const tabClick = (key: string) => {
  prevActiveKey.value = activeKey.value
  if (key === 'last') {
    createPortfolioModalOpen.value = true
  }
}

const fetchPortfolios = async () => {
  try {
    const { data } = await getPortfolios()
    data.forEach(el => addPane(el.portfolioName, el.id))
  } catch (error) {
    throw error
  }
}

const fetchPortfoliosCoins = async () => {
  try {
    const { data } = await getPortfoliosCoins()
    portfoliosCoins.value = data
  } catch (error) {
    throw error
  }
}

onMounted(async () => {
  if (!store.signedIn) {
    return
  }
  await fetchPortfolios()
  fetchPortfoliosCoins()
})

provide('addCoinPortfolioModalOpen', {
  addCoinPortfolioModalOpen,
  handleAddCoinPortfolioModalOpen: () => addCoinPortfolioModalOpen.value = true
})

provide('transactionCoin', transactionCoin)

provide('activeKey', activeKey)

provide('addTransaction', {
  addTransaction: (transaction: TypeTransaction) => transactions.value.push(transaction)
})

</script>

<template>

  <a-tabs
    v-model:activeKey="activeKey"
    class="portfolio-tab-nav"
    @tab-click="tabClick"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
    >
      <portfolio-overview
        v-if="pane.key === 'first'"
        :panes="panes"
        v-model="transactions"
      />
      <portfolio-info-block
        v-else-if="pane.key === 'last'"
        img-url="/crypto/no-manual-portfolio.png"
        text="Add transactions to your coins to easily track your<br> holdings, performance, and profit & losses."
      />
      <div v-else>
        <portfolio-header
          :pane-title="pane.title"
          v-model:change-portfolio-name-modal-open="changePortfolioNameModalOpen"
          v-model:delete-portfolio-modal-open="deletePortfolioModalOpen"
        />

        <portfolio-coins-table
          :portfolio-id="pane.key"
          :portfolios-coins="portfoliosCoins"
          v-model:add-transaction-portfolio-modal-open="addTransactionPortfolioModalOpen"
          v-model:transaction-coin="transactionCoin"
        />
      </div>
    </a-tab-pane>
  </a-tabs>

  <portfolio-create-modal
    :prev-active-key="prevActiveKey"
    v-model:active-key="activeKey"
    v-model:modal-open="createPortfolioModalOpen"
    @add-pane="addPane"
  />

  <portfolio-delete-modal
    v-model:active-key="activeKey"
    v-model:delete-portfolio-modal-open="deletePortfolioModalOpen"
    v-model:panes="panes"
  />

  <portfolio-change-name-modal
    :active-key="activeKey"
    v-model:change-portfolio-name-modal-open="changePortfolioNameModalOpen"
    v-model:panes="panes"
  />

  <portfolio-add-coin-modal
    :portfolioId="activeKey"
    v-model:portfolios-coins="portfoliosCoins"
  />

  <portfolio-add-transaction-modal v-model="addTransactionPortfolioModalOpen" />
</template>