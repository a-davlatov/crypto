<script lang="ts" setup>

import { reactive, ref } from 'vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { registerUser } from '../../api/user'
import { store } from '../../composables/store'

import type { UnwrapRef } from 'vue'
import type { FormProps, FormInstance } from 'ant-design-vue'
import type { TypeUser } from '../../types/TypeUser'
import type { Rule } from 'ant-design-vue/es/form'

const loading = defineModel('loading')
const responseText = defineModel('responseText')
const responseTextType = defineModel('responseTextType')
const alertVisible = defineModel('alertVisible')
const formRef = ref<FormInstance>()

const formState: UnwrapRef<TypeUser> = reactive({
  username: '',
  email: '',
  password: '',
  checkPass: '',
})

const pick = <T extends Record<string, string>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return Object.fromEntries(keys.map(key => [key, obj[key]])) as Pick<T, K>;
}

const validatePass = async (_rule: Rule, value: string) => {
  const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(value)
  if (value === '') {
    return Promise.reject('Please input the password')
  } else if (!passwordStrength) {
    return Promise.reject('Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character')
  } else {
    if (formState.checkPass !== '') {
      formRef.value?.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again')
  } else if (value !== formState.password) {
    return Promise.reject("Two inputs don't match!")
  } else {
    return Promise.resolve()
  }
}

const rules: Record<string, Rule[]> = {
  username: [
    { required: true, message: 'Please input your username', trigger: 'change' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
  ],
  email: [{ required: true, message: 'Please input your email', trigger: 'blur' }],
  password: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }],
}

const handleFinish: FormProps['onFinish'] = async () => {
  try {
    responseText.value = ''
    loading.value = true
    await registerUser(pick(formState, ['username', 'email', 'password']))
    formRef.value?.resetFields()
    store.headerModal.activeTabKey = '1'
    responseTextType.value = 'success'
    alertVisible.value = true
    responseText.value = 'Well done, you have successfully completed Registration. You can authorize in the form below'
  } catch (error: any) {
    responseTextType.value = 'error'
    alertVisible.value = true
    if (error.response.status === 401) {
      responseText.value = 'User with the same email already exists, please try again with another email'
      console.error(error.name + ': ', error.message)
      return
    }
    responseText.value = 'Something went wrong, try again later please'
    throw error
  } finally {
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
    <a-form-item
      has-feedback
      name="username"
    >
      <a-input
        v-model:value="formState.username"
        placeholder="Username"
      >
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item
      has-feedback
      name="email"
    >
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
    <a-form-item
      has-feedback
      name="password"
    >
      <a-input-password
        v-model:value="formState.password"
        type="password"
        placeholder="Password"
        autocomplete="off"
      >
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item
      has-feedback
      name="checkPass"
    >
      <a-input-password
        v-model:value="formState.checkPass"
        type="password"
        placeholder="Confirm password"
        autocomplete="off"
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
        Sign Up
      </a-button>
    </a-form-item>
  </a-form>
</template>