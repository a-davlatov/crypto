<script lang="ts" setup>

import { ref, reactive, inject, watch } from 'vue'
import dayjs from 'dayjs'
import { message } from 'ant-design-vue'
import { useUcFirst } from '@/composables/useUcFirst'
import { postTransaction } from '@/api/transaction'

import type { UnwrapRef, Ref } from 'vue'
import type { FormProps, FormInstance } from 'ant-design-vue'
import type { TypeCoin } from '@/types/TypeCoin'
import type { TypeTransaction } from "@/types/TypeTransaction"

interface ITransaction {
  amount: number | null
  total: number | null
  price: number | null
  date: string
}

interface IAddTransaction {
  addTransaction: (transaction: TypeTransaction) => void
}

const loading = defineModel()
const formRef = ref<FormInstance>()
const transactionCoin = inject<Ref<TypeCoin>>('transactionCoin')
const portfolioId = inject<Ref<string>>('activeKey')
const { addTransaction } = inject<IAddTransaction>('addTransaction', { addTransaction: (transaction: TypeTransaction) => { } })

const formState: UnwrapRef<ITransaction> = reactive({
  amount: null,
  total: null,
  price: null,
  date: ''
})

const amountChange = (value: number) => {
  if (transactionCoin) {
    formState.total = +(value * +transactionCoin.value.price).toFixed(2)
  }
}

const priceChange = (value: number) => {
  if (formState.amount) {
    if (value === null && transactionCoin) {
      formState.total = +(formState.amount * transactionCoin.value.price).toFixed(2)
      return
    }
    formState.total = +(formState.amount * value).toFixed(2)
  }
}

const handleFinish: FormProps['onFinish'] = async (values) => {
  try {
    loading.value = true
    const transaction: TypeTransaction = {
      portfolioId: portfolioId?.value ?? '',
      coinId: transactionCoin?.value.id ?? '',
      coinName: transactionCoin?.value.name ?? '',
      coinSymbol: transactionCoin?.value.symbol ?? '',
      coinIcon: transactionCoin?.value.icon ?? '',
      amount: values.amount,
      total: values.total,
      price: values.price,
      date: dayjs(values.date).format('YYYY-MM-DD HH:mm:ss'),
    }

    await postTransaction(transaction)
    addTransaction(transaction)
    message.success('Transaction added successfully')
    formRef.value?.resetFields()
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}

watch(() => transactionCoin?.value, () => {
  if (transactionCoin) {
    formState.price = +transactionCoin?.value.price.toFixed(2)
  }
}, { immediate: true })

</script>

<template>
  <a-form
    ref="formRef"
    layout="vertical"
    class="transaction-form"
    :model="formState"
    @finish="handleFinish"
  >
    <div>
      <a-typography-text strong>Coin</a-typography-text>
      <a-flex
        v-if="transactionCoin"
        gap="small"
        align="center"
        horizontal
        :style="{ marginTop: '5px' }"
      >
        <img
          :src="transactionCoin.icon"
          :alt="transactionCoin.name"
          width="24"
          height="24"
        >
        <a-typography-text strong>{{ useUcFirst(transactionCoin.name) }}</a-typography-text>
      </a-flex>
    </div>
    <a-form-item
      label="Total spent"
      name="total"
      :style="{ fontWeight: '500', position: 'relative' }"
    >
      <a-input-number
        v-model:value="formState.total"
        :style="{ width: '100%' }"
      />
      <a-typography-text
        type="secondary"
        strong
        :style="{ position: 'absolute', bottom: '5px', right: '10px' }"
      >
        USD
      </a-typography-text>
    </a-form-item>
    <a-row :gutter="16">
      <a-col
        class="gutter-row"
        :xs="24"
        :lg="12"
      >
        <a-form-item
          label="Amount"
          name="amount"
          :style="{ fontWeight: '500', position: 'relative' }"
          :rules="[{ required: true, message: 'Must be more than 0' }]"
        >
          <a-input-number
            v-model:value="formState.amount"
            placeholder="1.00"
            :min="1"
            :style="{ width: '100%' }"
            @change="amountChange"
          />
          <a-typography-text
            type="secondary"
            strong
            :style="{ position: 'absolute', bottom: '5px', right: '10px' }"
          >
            {{ transactionCoin?.symbol.slice(0, 3).toUpperCase() }}
          </a-typography-text>
        </a-form-item>
      </a-col>
      <a-col
        class="gutter-row"
        :xs="24"
        :lg="12"
      >
        <a-form-item
          label="Price per coin"
          name="price"
          :min="0"
          :style="{ fontWeight: '500', position: 'relative' }"
        >
          <a-input-number
            v-model:value="formState.price"
            placeholder="1.00"
            :style="{ width: '100%' }"
            @change="priceChange"
          />
          <a-typography-text
            type="secondary"
            strong
            :style="{ position: 'absolute', bottom: '5px', right: '10px' }"
          >
            USD
          </a-typography-text>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item
      label="Date & Time"
      name="date"
      :style="{ fontWeight: '500' }"
      :rules="[{ required: true, message: 'Select the date please' }]"
    >
      <a-date-picker
        show-time
        placeholder="Select Time"
        v-model:value="formState.date"
        :style="{ width: '100%' }"
      />
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        Add transaction
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style>
.transaction-form .ant-input-number-handler-wrap {
  display: none;
}
</style>