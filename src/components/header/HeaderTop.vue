<script lang="ts" setup>

import { store } from '@/composables/store'
import { UserOutlined } from '@ant-design/icons-vue'
import { useHeaderModalOpen } from '@/composables/useHeaderModalOpen'
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons-vue'

import HeaderModal from '@/components/modal/HeaderModal.vue'
import HeaderStats from './HeaderStats.vue'

const logout = () => {
  store.signedIn = false
  store.userData = null
  localStorage.removeItem('userData')
}

</script>

<template>
  <div class="header__top">
    <div class="container">
      <div class="header__top-inner">
        <header-stats />

        <a-dropdown
          v-if="store.signedIn"
          :trigger="['click']"
          :overlayStyle="{ minWidth: '200px' }"
          placement="bottomRight"
          class="header__top-dropdown"
        >
          <a-avatar :style="{ cursor: 'pointer' }">
            <template #icon>
              <user-outlined />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-flex
                gap="small"
                align="center"
                horizontal
                :style="{ margin: '10px' }"
              >
                <a-avatar>
                  <template #icon>
                    <user-outlined />
                  </template>
                </a-avatar>
                <div>
                  <div :style="{ fontWeight: '600', lineHeight: '1' }">Hi, {{ store.userData?.data.username }}</div>
                  <a
                    :href="`mailto:${store.userData?.data.email}`"
                    :style="{ fontSize: '14px', color: '#00000073', fontWeight: '500' }"
                  >
                    {{ store.userData?.data.email }}
                  </a>
                </div>
              </a-flex>
              <a-menu-divider />
              <a-menu-item key="0">
                <router-link to="/account">Login and Security</router-link>
              </a-menu-item>
              <a-menu-item key="1">
                <router-link to="/mynfts">My NFTs</router-link>
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item
                key="3"
                @click="logout"
              >
                Log out
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-flex
          v-else
          gap="small"
          align="center"
          justify="end"
          horizontal
          class="header__top-buttons"
        >
          <a-button
            type="primary"
            ghost
            @click="useHeaderModalOpen('1')"
          >
            <span>Log In</span>
            <login-outlined class="header__top-icon" />
          </a-button>
          <a-button
            type="primary"
            @click="useHeaderModalOpen('2')"
          >
            <span>Sign up</span>
            <user-add-outlined class="header__top-icon" />
          </a-button>
        </a-flex>
      </div>
    </div>
  </div>

  <header-modal />
</template>

<style scoped>
.header__top {
  padding: 10px 0;
}

.header__top-icon {
  display: none;
  margin: 0 !important;
}

.header__top-inner {
  display: grid;
  grid-template-columns: 1fr 160px;
  align-items: center;
  gap: 15px;
}

.header__top-dropdown,
.header__top-buttons {
  position: relative;
}
.header__top-dropdown {
  overflow: visible
}
.header__top-dropdown::after,
.header__top-buttons::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: -40px;
  z-index: 100;
  width: 25px;
  height: 100%;
  background: linear-gradient(to left, #fff, transparent);
}

.layout.signed-in .header__top-inner {
  grid-template-columns: 1fr 32px;
}

@media (max-width: 576px) {
  .header__top-inner {
    grid-template-columns: 1fr 100px;
  }
  .header__top-buttons button span:first-of-type {
    display: none !important;
  }

  .header__top-icon {
    display: block;
  }
}
</style>