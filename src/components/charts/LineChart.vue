<script setup lang="ts">

import { computed, ref, watch } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { getCoinCharts } from '@/api/coins'
import dayjs from 'dayjs'

import type { TypeTransaction } from "@/types/TypeTransaction"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  transactions: TypeTransaction[]
}

type TypeDataPoint = [number, number, number, number]
const colors: string[] = ['#41B883', '#E46651', '#00D8FF', '#DD1B16']

const props = defineProps<Props>()
const coinsCharts = ref<TypeDataPoint[][]>([])

const data = computed(() => ({
  labels: coinsCharts.value.map((data: TypeDataPoint[]) => data.map(price => dayjs.unix(price[0]).format('MMM Do')))[0],
  datasets: coinsCharts.value.map((data: TypeDataPoint[], index) => ({
    label: props.transactions[index].coinName,
    backgroundColor: colors[index],
    borderColor: colors[index],
    data: data.map(price => price[1]),
  }))
}))

const options = {
  responsive: true,
  maintainAspectRatio: false
}

watch(props.transactions, async () => {
  for (const transaction of props.transactions) {
    try {
      const { data } = await getCoinCharts(transaction.coinId, '1m')
      coinsCharts.value.push(data)
    } catch (error) {
      throw error
    }
  }
}, { immediate: true })
</script>

<template>
  <Line
    :data="data"
    :options="options"
  />
</template>