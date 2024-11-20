<script setup lang="ts">

import { h, inject } from 'vue'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type { IHandleAddCoinPortfolioModalOpen } from '@/interfaces/IHandleAddCoinPortfolioModalOpen'

const deletePortfolioModalOpen = defineModel('deletePortfolioModalOpen')
const changePortfolioNameModalOpen = defineModel('changePortfolioNameModalOpen')

const { handleAddCoinPortfolioModalOpen } = inject<IHandleAddCoinPortfolioModalOpen>('addCoinPortfolioModalOpen', { handleAddCoinPortfolioModalOpen: () => { } })

interface Props {
  paneTitle: string
}

defineProps<Props>()

</script>

<template>
  <a-flex
    gap="middle"
    align="center"
    justify="space-between"
    wrap="wrap"
    horizontal
  >
    <a-typography-title
      :level="2"
      :style="{ margin: '0' }"
    >
      {{ paneTitle }}
    </a-typography-title>
    <a-flex
      gap="small"
      align="center"
      wrap="wrap"
      horizontal
    >
      <a-button
        :icon="h(PlusOutlined)"
        @click="handleAddCoinPortfolioModalOpen"
      >Add coin</a-button>
      <a-button
        :icon="h(EditOutlined)"
        @click="() => changePortfolioNameModalOpen = true"
      >Change name</a-button>
      <a-button
        :icon="h(DeleteOutlined)"
        @click="() => deletePortfolioModalOpen = true"
      >Delete portfolio</a-button>
    </a-flex>
  </a-flex>
</template>