<template>
  <QuickRangePicker v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
import QuickRangePicker from '../components/QuickRangePicker.vue'
const value = ref()

</script>

<style scoped>
</style>
