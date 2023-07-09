<script setup>
import { ref, onMounted } from 'vue'
import axiosApiInstance from '../api'

import Card from 'primevue/card'
import LoaderSpinner from '../components/LoaderSpinner.vue'

const cars = ref();
const isLoading = ref(false)

const getCarList = async () => {
  try {
    isLoading.value = true
    const response = await axiosApiInstance.get(`https://my-app-466e8-default-rtdb.europe-west1.firebasedatabase.app/cars.json`)
    cars.value = response.data
  } catch (err) {
    console.log(err.response)
  } finally {
    isLoading.value = false
  }
}

onMounted( async () => {
  await getCarList()
})
</script>
<template>
  <h2>Cars</h2>
  <LoaderSpinner v-if="isLoading" />
  <div v-else class="flex flex-column gap-3">
    <Card v-for="(car, i) in cars" :key="i">
      <template #title>{{ car.brand }}</template>
      <template #subtitle>{{ car.model }}</template>
    </Card>
  </div>
</template>