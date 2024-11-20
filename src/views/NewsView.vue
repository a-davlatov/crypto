<script setup lang="ts">
import CoinsNews from '@/components/CoinsNews.vue'
</script>

<template>
  <a-layout-content>
    <coins-news
      :page="1"
      :limit="20"
    />
  </a-layout-content>
</template>
