<script setup lang="ts">

import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { createPortfolio } from '@/api/portfolio'

import type { UnwrapRef } from 'vue'
import type { FormProps, FormInstance } from 'ant-design-vue'
import type { TypePortfolioName } from '@/types/TypePortfolioName'
import type { Rule } from 'ant-design-vue/es/form'

interface Props {
  prevActiveKey: string
}

const props = defineProps<Props>()

const activeKey = defineModel('activeKey')
const modalOpen = defineModel('modalOpen')
const emit = defineEmits(['addPane'])

const formRef = ref<FormInstance>()
const loading = ref(false)

const formState: UnwrapRef<TypePortfolioName> = reactive({
  portfolioName: '',
})

const rules: Record<string, Rule[]> = {
  portfolioName: [{ required: true, message: 'Cannot be empty', trigger: 'change' }],
}

const handleFinish: FormProps['onFinish'] = async () => {
  try {
    loading.value = true
    const { data } = await createPortfolio(formState)
    emit('addPane', data.portfolioName, data.id)
    message.success(`"${formState.portfolioName}" created successfully`)
    formRef.value?.resetFields()
    activeKey.value = props.prevActiveKey
    modalOpen.value = false
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
    v-model:open="modalOpen"
    :footer="null"
    centered
    @cancel="() => activeKey = props.prevActiveKey"
  >
    <a-spin :spinning="loading">
      <a-typography-title
        :level="4"
        :style="{ marginTop: '0' }"
      >
        New Portfolio
      </a-typography-title>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
      >
        <a-form-item
          has-feedback
          name="portfolioName"
        >
          <a-input
            v-model:value="formState.portfolioName"
            placeholder="My Portfolio"
          >
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :style="{ width: '100%' }"
          >
            Create
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>