<script lang="ts" setup>

import { ref } from 'vue'
import HeaderMenu from '../header/HeaderMenu.vue'
import HeaderTop from '../header/HeaderTop.vue'
import TheBurger from '../TheBurger.vue'

const showNav = ref(false)

</script>

<template>
  <header :class="{ 'show-nav': showNav }" class="header" :style="{ backgroundColor: '#fff' }">
    <header-top />
    <div class="header__bottom">
      <div class="container">
        <a-flex
          gap="small"
          align="center"
          class="header__bottom-inner"
          horizontal
        >
          <router-link
            to="/"
            style="color: #000;"
          >
            <a-flex
              gap="small"
              align="end"
              horizontal
            >
              <img
                src="/logo.svg"
                alt="logo"
                width="30"
                height="30"
              >
              <a-typography-title
                :level="4"
                :style="{ margin: 0 }"
              >
                VueCrypto
              </a-typography-title>
            </a-flex>
          </router-link>

          <header-menu />
          <the-burger v-model="showNav" />
        </a-flex>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header__bottom {
  position: relative;
  border-top: 1px solid #0505050f;
  border-bottom: 1px solid #0505050f;
  padding: 8px 0;
}

@media (max-width: 768px) {
  .header__bottom {
    padding: 12px 0;
  }
  .header__bottom-inner {
    justify-content: space-between;
  }
}
</style>