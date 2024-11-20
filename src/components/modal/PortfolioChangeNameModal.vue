<script setup lang="ts">

import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { changePortfolioName } from '@/api/portfolio'

import type { UnwrapRef } from 'vue'
import type { FormProps, FormInstance } from 'ant-design-vue'
import type { TypePortfolioName } from '@/types/TypePortfolioName'
import type { Rule } from 'ant-design-vue/es/form'
import type { IPane } from '@/interfaces/IPane'

const formRef = ref<FormInstance>()
const loading = ref(false)
const changePortfolioNameModalOpen = defineModel('changePortfolioNameModalOpen')
const panes = defineModel<IPane[]>('panes', { default: [] })

interface Props {
  activeKey: string
}

const props = defineProps<Props>()

const changePane = (name: string) => {
  panes.value.forEach((el) => {
    if (el.key === props.activeKey) el.title = name
  })
}

const formState: UnwrapRef<TypePortfolioName> = reactive({
  portfolioName: '',
})

const rules: Record<string, Rule[]> = {
  portfolioName: [{ required: true, message: 'Cannot be empty', trigger: 'change' }],
}

const handleFinish: FormProps['onFinish'] = async () => {
  try {
    loading.value = true
    await changePortfolioName(+props.activeKey, formState)
    changePane(formState.portfolioName)
    message.success(`Portfolio name changed to "${formState.portfolioName}" successfully`)
    formRef.value?.resetFields()
    changePortfolioNameModalOpen.value = false
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
    v-model:open="changePortfolioNameModalOpen"
    :footer="null"
    centered
  >
    <a-spin :spinning="loading">
      <a-typography-title
        :level="4"
        :style="{ marginTop: '0' }"
      >
        Change Portfolio name
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
            Save
          </a-button>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>