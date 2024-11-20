<script setup lang="ts">

import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { deletePortfolio } from '@/api/portfolio'

import type { IPane } from '@/interfaces/IPane'

const loading = ref(false)
const deletePortfolioModalOpen = defineModel('deletePortfolioModalOpen')
const panes = defineModel<IPane[]>('panes', { default: [] })
const activeKey = defineModel<string>('activeKey', { required: true })

const removePane = (id: number) => {
  panes.value = panes.value.filter(el => +el.key !== id)
}

const removePortfolio = async () => {
  try {
    loading.value = true
    await deletePortfolio(+activeKey.value)
    removePane(+activeKey.value)
    deletePortfolioModalOpen.value = false
    activeKey.value = 'first'
    message.success(`Portfolio deleted successfully`)
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}

</script>

<template>

  <a-modal
    v-model:open="deletePortfolioModalOpen"
    :footer="null"
    centered
  >
    <a-spin :spinning="loading">
      <a-typography-title
        :level="4"
        :style="{ marginTop: '0' }"
      >
        Delete Portfolio
      </a-typography-title>
      <a-typography-paragraph type="secondary">I understand that this portfolio will be mercilessly deleted and I will
        never be able to get it back in my life</a-typography-paragraph>
      <a-flex
        gap="small"
        align="center"
        horizontal
      >
        <a-button
          @click="() => deletePortfolioModalOpen = false"
          :style="{ width: '50%' }"
        >Cancel</a-button>
        <a-button
          @click="removePortfolio()"
          type="primary"
          danger
          :style="{ width: '50%' }"
        >Delete</a-button>
      </a-flex>
    </a-spin>
  </a-modal>
</template>