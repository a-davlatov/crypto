<script lang="ts" setup>

import { ref, reactive } from 'vue'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { loginUser } from '../../api/user'
import { store } from '../../composables/store'
import { useHeaderModalClose } from '../../composables/useHeaderModalClose'

import type { UnwrapRef } from 'vue'
import type { FormProps, FormInstance } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { TypeUser } from '../../types/TypeUser'

const loading = defineModel('loading')
const responseText = defineModel('responseText')
const responseTextType = defineModel('responseTextType')
const alertVisible = defineModel('alertVisible')
const formRef = ref<FormInstance>()

const formState: UnwrapRef<TypeUser> = reactive({
  email: '',
  password: '',
})

const rules: Record<string, Rule[]> = {
  email: [{ required: true, message: 'Please input your email', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input your password', trigger: 'change' }],
}

const handleFinish: FormProps['onFinish'] = async () => {
  try {
    responseText.value = ''
    loading.value = true
    const { data } = await loginUser(formState)
    message.success('Signed in successfully')
    store.signedIn = true
    localStorage.setItem('userData', JSON.stringify(data))
    store.userData = JSON.parse(localStorage.getItem('userData') || '')
    useHeaderModalClose()
  } catch (error: any) {
    responseTextType.value = 'error'
    alertVisible.value = true
    if (error.response.status === 401) {
      responseText.value = 'Invalid login or password'
      console.error(error.name + ': ', error.message)
      return
    }
    responseText.value = 'Something went wrong, please try again later'
    throw error
  } finally {
    formRef.value?.resetFields()
    loading.value = false
  }
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    @finish="handleFinish"
  >
    <a-alert
      v-if="alertVisible"
      :message="responseText"
      :type="responseTextType"
      :after-close="() => alertVisible = false"
      show-icon
      closable
    />
    <a-form-item name="email">
      <a-input
        v-model:value="formState.email"
        placeholder="Email"
        type="email"
      >
        <template #prefix>
          <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="password">
      <a-input-password
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
      >
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped>
.ant-form .ant-btn-primary {
  width: 100%
}

.ant-form .ant-form-item {
  margin: 15px 0 0
}
</style>