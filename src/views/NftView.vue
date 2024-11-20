<script setup lang="ts">

import NftTable from '@/components/table/NftTable.vue'

</script>

<template>
  <a-layout-content>
    <div class="container">
      <a-typography-title
        :level="2"
        :style="{ marginTop: '0' }"
      >
        Nft Trending
      </a-typography-title>
      <a-typography-paragraph
        :style="{ margin: '20px 0' }"
        type="secondary"
      >
        This page allows you to retrieve a list
        of trending Non-Fungible Tokens (NFTs) in the marketplace. Trending NFTs typically represent the most popular
        <br>or highly sought-after digital assets based on sales volume
      </a-typography-paragraph>

      <nft-table />
    </div>
  </a-layout-content>
</template>