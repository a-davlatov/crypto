<script lang="ts" setup>

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordNameGeneric } from 'vue-router'

const route = useRoute()
const current = ref<string[] | RouteRecordNameGeneric[]>([''])

watch(
  () => route.name, 
  () => current.value = [route.name],
  { once: true }
)

</script>

<template>
  <a-menu
    v-model:selectedKeys="current"
    theme="light"
    mode="horizontal"
    :style="{ border: '0', flexGrow: '1', JustifyContent: 'flex-end' }"
  >
    <a-menu-item key="home">
      <router-link to="/">Cryptocurrencies</router-link>
    </a-menu-item>
    <a-menu-item key="exchanges">
      <router-link to="/exchanges">Exchanges</router-link>
    </a-menu-item>
    <a-menu-item key="nft">
      <router-link to="/nft">NFT</router-link>
    </a-menu-item>
    <a-menu-item key="news">
      <router-link to="/news">News</router-link>
    </a-menu-item>
    <a-menu-item key="portfolio" style="padding-right: 0;">
      <router-link to="/portfolio">Portfolio</router-link>
    </a-menu-item>
  </a-menu>
</template>

<style>
.header .ant-menu-light.ant-menu-horizontal>.ant-menu-item::after {
  bottom: -8px;
}

.header.show-nav .ant-menu {
  display: flex;
}

@media (max-width: 768px) {
  .burger {
    display: flex;
  }

  .header .ant-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #0505050f !important;
  }

  .ant-menu-item {
    opacity: 1 !important;
    position: initial !important;
    height: auto !important;
    pointer-events: initial !important;
  }

  .ant-menu-submenu {
    display: none !important;
  }
  .header .ant-menu-light.ant-menu-horizontal>.ant-menu-item::after {
    display: none;
  }
}
</style>