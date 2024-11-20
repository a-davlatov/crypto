<script setup lang="ts">

import CoinsTable from '@/components/table/CoinsTable.vue'
import CoinsNews from '@/components/CoinsNews.vue'

</script>

<template>
  <a-layout-content>
    <coins-table />
    <coins-news
      :page="1"
      :limit="4"
    />
  </a-layout-content>
</template>
