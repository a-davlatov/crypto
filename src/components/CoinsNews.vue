<script setup lang="ts">

import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getNews } from '../api/news'
import { useTimeDifference } from '../composables/useTimeDifference'
import { useErrorImage } from '../composables/useErrorImage'

import type { TypeQueryParams } from '../types/TypeQueryParams'
import type { TypeNews } from '../types/TypeNews'

const route = useRoute()
const { page, limit } = defineProps<TypeQueryParams>()

const news = ref<TypeNews[]>([])
for (let i = 0; i < limit; i++) {
  news.value.push({
    source: '',
    title: '',
    imgUrl: '',
    link: '',
    feedDate: 1234567,
  })
}

const imgUrls: string[] = ['cryptocurrency.webp', 'cryptocurrencies-1.webp', 'cryptocurrencies-2.webp', 'cryptocurrencies-3.webp', 'cryptocurrencies-4.webp', 'cryptocurrencies-5.webp']
const loading = ref<boolean>(false)

const pageNumber = ref(page)

const handleErrorImage = useErrorImage(imgUrls)

const fetchNews = async (page: number) => {
  try {
    loading.value = true
    const { data } = await getNews({ page, limit })
    if (page === 1) {
      news.value = data.result
      return
    }
    news.value = news.value.concat(data.result)
  } catch (error) {
    throw error
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchNews(pageNumber.value))

watch(pageNumber, () => {
  fetchNews(pageNumber.value)
})

</script>

<template>
  <div class="container">
    <a-typography-title
      :level="2"
      :style="route.path === '/news' ? { margin: '0 0 25px' } : { margin: '40px 0 25px' }"
    >
      Latest Crypto News
    </a-typography-title>

    <a-row :gutter="[16, 16]">
      <a-col
        v-for="(item, index) in news"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
      >
        <a
          :href="item.link"
          target="_blank"
        >
          <a-card
            hoverable
            style="width: 100%; height: 100%; display: flex; flex-direction: column;"
            :loading="pageNumber === 1 ? loading : false"
          >
            <template #cover>
              <div style="height: 170px;">
                <img
                  :src="item.imgUrl"
                  :alt="item.title"
                  style="height: 100%; width: 100%;"
                  @error="handleErrorImage"
                />
              </div>
            </template>
            <a-card-meta>
              <template #title>
                <a-typography-text style="white-space: pre-wrap; font-size: 16px; line-height: 1;">
                  {{ item.title.length > 55 ? `${item.title.slice(0, 55)}...` : item.title }}
                </a-typography-text>
              </template>
              <template #description>
                <a-typography-paragraph
                  strong
                  style="line-height: 1.2; margin: 15px 0 5px;"
                >
                  {{ item.source }}
                </a-typography-paragraph>
                <a-typography-text
                  type="secondary"
                  strong
                >
                  {{ useTimeDifference(item.feedDate) }}
                </a-typography-text>
              </template>
            </a-card-meta>
          </a-card>
        </a>
      </a-col>
    </a-row>

    <a-flex
      justify="center"
      style="margin-top: 20px"
    >
      <a-button
        v-if="route.path === '/news'"
        type="primary"
        :loading="loading"
        @click="pageNumber++"
        ghost
      >
        More News
      </a-button>
      <router-link
        v-else
        to="/news"
        class="btn btn-primary-outlined"
      >
        See More News
      </router-link>
    </a-flex>

  </div>
</template>

<style>
.ant-card-body,
.ant-card-meta {
  height: 100%;
}

.ant-card-meta-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ant-card .ant-card-meta-detail,
.ant-card .ant-card-meta-title {
  overflow: unset;
}

.ant-table-sticky-scroll {
  display: none !important;
}
</style>