<script lang="ts" setup>

import { ref } from 'vue'
import AddTransactionForm from '@/components/form/AddTransactionForm.vue'

const loading = ref<boolean>(false)
const modalOpen = defineModel()
const activeKey = ref('1')

</script>

<template>
  <a-modal
    v-model:open="modalOpen"
    :footer="null"
    centered
  >
    <a-spin :spinning="loading">
      <a-typography-title
        :level="4"
        :style="{ marginTop: '0' }"
      >
        Add Transaction
      </a-typography-title>
      <a-tabs
        v-model:activeKey="activeKey"
        centered
      >
        <a-tab-pane
          key="1"
          tab="Buy"
        >
          <add-transaction-form v-model="loading" />
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="Sell"
        >
          <a-result
            status="404"
            title="Under construction"
            sub-title="Sorry, this functionality is currently under construction."
            style="background-color: #fff"
          >
          </a-result>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          tab="Transfer"
        >
          <a-result
            status="404"
            title="Under construction"
            sub-title="Sorry, this functionality is currently under construction."
            style="background-color: #fff"
          >
          </a-result>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </a-modal>
</template>