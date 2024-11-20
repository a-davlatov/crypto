<script lang="ts" setup>

import { onMounted } from 'vue'
import { authUser } from '@/api/user'
import { store } from '@/composables/store'

import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'

onMounted(async () => {
  if (localStorage.getItem('userData')) {
    store.userData = JSON.parse(localStorage.getItem('userData') || '')
    store.signedIn = true

    try {
      await authUser()
    } catch (error: any) {
      store.userData = null
      store.signedIn = false
      localStorage.removeItem('userData')
      if (error.response.status === 401) {
        console.error('Unauthorized: ', error.message)
        return
      }
      if (error.response.status === 404) {
        console.error('User not found: ', error.message)
        return
      }
      throw error
    }
  }
})

</script>

<template>
  <a-layout
    class="layout"
    :class="{ 'signed-in': store.signedIn }"
  >

    <the-header />
    <router-view />
    <the-footer />

  </a-layout>
</template>

<style scoped>
.ant-layout-content {
  padding: 40px 0;
  background-color: #fff;
}
</style>
