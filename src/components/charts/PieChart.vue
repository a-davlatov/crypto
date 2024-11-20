<script setup lang="ts">

import { computed } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

interface Props {
  data: number[]
  labels: string[]
}

const props = defineProps<Props>()

ChartJS.register(ArcElement, Tooltip, Legend)

const data = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: '$',
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: props.data,
      cutout: '50%',
    }
  ]
}))

const options = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>

<template>
  <Pie
    :data="data"
    :options="options"
  />
</template>