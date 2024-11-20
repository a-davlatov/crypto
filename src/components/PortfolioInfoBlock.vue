<script setup lang="ts">

import { inject } from 'vue'
import { store } from '@/composables/store'
import type { IHandleAddCoinPortfolioModalOpen } from '@/interfaces/IHandleAddCoinPortfolioModalOpen'

interface Props {
  imgUrl: string
  titleLevel?: number
  titleText?: string
  text: string
  btnText?: string
}

defineProps<Props>()

const { handleAddCoinPortfolioModalOpen } = inject<IHandleAddCoinPortfolioModalOpen>('addCoinPortfolioModalOpen', { handleAddCoinPortfolioModalOpen: () => { } })
const emit = defineEmits(['handleClick'])

const btnClick = () => {
  if (store.signedIn) {
    handleAddCoinPortfolioModalOpen()
    return
  }
  emit('handleClick')
}

</script>

<template>
  <a-flex
    gap="small"
    align="center"
    justify="center"
    style="margin: 40px 0;"
    vertical
  >
    <img
      :src="imgUrl"
      alt="no-portfolio"
      height="240"
      width="240"
    />
    <a-typography-title
      v-if="titleText && titleLevel"
      :level="titleLevel"
      :style="{ margin: '0', fontWeight: '700', textAlign: 'center', fontSize: '30px' }"
    >
      {{ titleText }}
    </a-typography-title>
    <a-typography-paragraph
      type="secondary"
      class="text"
      strong
      v-html="text"
    >
    </a-typography-paragraph>
    <a-button
      v-if="btnText"
      type="primary"
      :style="{ fontWeight: '500' }"
      @click="btnClick"
    >
      {{ btnText }}
    </a-button>
  </a-flex>
</template>

<style scoped>
.text {
  font-size: 20px;
  text-align: center;
}
@media (max-width: 576px) {
  .text {
    font-size: 16px ;
  }
}
</style>