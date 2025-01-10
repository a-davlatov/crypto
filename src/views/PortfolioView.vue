<script setup lang="ts">

import { store } from '@/composables/store'
import { useHeaderModalOpen } from '../composables/useHeaderModalOpen'

import PortfolioTabs from '@/components/portfolio/PortfolioTabs.vue'
import PortfolioInfoBlock from '@/components/portfolio/PortfolioInfoBlock.vue'

</script>

<template>
  <a-layout-content>
    <div class="container">
      <portfolio-tabs v-if="store.signedIn" />
      <portfolio-info-block
        v-else
        img-url="/crypto/no-portfolio.png"
        :title-level="1"
        title-text="Let’s get started with your first portfolio!"
        text="Track profits, losses and valuation all in one place."
        btn-text="Create Portfolio"
        @handle-click="useHeaderModalOpen('1')"
      />
    </div>

  </a-layout-content>
</template>

<style>
.portfolio-tab-nav>div::before {
  display: none;
}
</style>