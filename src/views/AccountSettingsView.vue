<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { store } from '@/composables/store'
import { patchUser } from '@/api/user'
import { useHeaderModalOpen } from '@/composables/useHeaderModalOpen'

import type { UnwrapRef } from 'vue'
import type { TypeUser } from '../types/TypeUser'
import type { Rule } from 'ant-design-vue/es/form'
import type { FormProps, FormInstance } from 'ant-design-vue'

const formRef = ref<FormInstance>()
const loading = ref(false)
const router = useRouter()

const formState: UnwrapRef<TypeUser> = reactive({
  username: '',
  email: '',
  password: '',
  checkPass: '',
})

const validatePass = async (_rule: Rule, value: string) => {
  const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(value)
  if (value !== '' && !passwordStrength) {
    return Promise.reject('Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character')
  } else {
    if (formState.checkPass !== '') {
      formRef.value?.validateFields('checkPass')
    }
    return Promise.resolve()
  }
}

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value !== formState.password) {
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
  password: [{ validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
}

const handleFinish: FormProps['onFinish'] = async (values) => {
  try {
    loading.value = true
    const userData: TypeUser = {
      username: values.username,
      email: values.email,
    }
    if (values.password !== '') userData.password = values.password

    await patchUser(userData)
    store.userData = null
    store.signedIn = false
    localStorage.removeItem('userData')
    router.push('/')
    useHeaderModalOpen('1')

    message.success('Saved successfully')
    message.info('Re-authorize please.', 10)
  } catch (error) {
    message.error('Something went wrong, try again later please')
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  formState.username = store.userData?.data.username
  formState.email = store.userData?.data.email
})

</script>

<template>
  <a-layout-content>
    <div class="container">
      <a-row :gutter="[16, 16]">
        <a-col :xl="4">
          <div class="profile__avatar">
            {{ store.userData?.data.username?.slice(0, 1) }}
          </div>
        </a-col>
        <a-col :xl="20">
          <a-form
            layout="vertical"
            ref="formRef"
            :model="formState"
            :rules="rules"
            @finish="handleFinish"
          >
            <a-row :gutter="[16, 0]">
              <a-col :xs="24" :md="12">
                <a-form-item
                  has-feedback
                  name="username"
                  label="Username"
                >
                  <a-input
                    v-model:value="formState.username"
                    size="large"
                  >
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item
                  has-feedback
                  name="email"
                  label="Email"
                >
                  <a-input
                    v-model:value="formState.email"
                    size="large"
                    type="email"
                  >
                    <template #prefix>
                      <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item
                  has-feedback
                  name="password"
                  label="New password (do not fill in to leave an old password)"
                >
                  <a-input-password
                    v-model:value="formState.password"
                    type="password"
                    size="large"
                    autocomplete="off"
                  >
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item
                  has-feedback
                  name="checkPass"
                  label="Confirm password"
                >
                  <a-input-password
                    v-model:value="formState.checkPass"
                    type="password"
                    size="large"
                    autocomplete="off"
                  >
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="4">
                <a-form-item>
                  <a-button
                    type="primary"
                    html-type="submit"
                    :loading="loading"
                  >
                    Save
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<style scoped>
.profile__avatar {
  width: 180px;
  height: 180px;
  border-radius: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  color: #333;
  background-color: #4ade80;
}

@media (max-width: 576px) {
  .profile__avatar {
    width: 100px;
    height: 100px;
    font-size: 50px;
    border-radius: 25px;
  }
}
</style>