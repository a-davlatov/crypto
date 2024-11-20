<script lang="ts" setup>

import { ref } from 'vue'
import { store } from '../../composables/store'
import LoginForm from '../form/LoginForm.vue'
import RegisterForm from '../form/RegisterForm.vue'

const loading = ref<boolean>(false)
const responseText = ref('')
const responseTextType = ref('error')
const alertVisible = ref(false)

const tabChange = () => {
  responseText.value = ''
  alertVisible.value = false
}

</script>

<template>
  <a-modal
    v-model:open="store.headerModal.isModalVisible"
    :footer="null"
    centered
  >
    <a-spin :spinning="loading">
      <a-tabs
        v-model:activeKey="store.headerModal.activeTabKey"
        @change="tabChange"
        centered
      >
        <a-tab-pane
          key="1"
          tab="Log In"
        >
          <login-form
            v-model:loading="loading"
            v-model:response-text="responseText"
            v-model:response-text-type="responseTextType"
            v-model:alert-visible="alertVisible"
          />
        </a-tab-pane>
        <a-tab-pane
          key="2"
          tab="Sign Up"
        >
          <register-form
            v-model:loading="loading"
            v-model:response-text="responseText"
            v-model:response-text-type="responseTextType"
            v-model:alert-visible="alertVisible"
          />
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </a-modal>
</template>