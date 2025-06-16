<template>
  <ResizelRLayout>
    <template #left>
      <div class="border-box">左侧内容</div>
    </template>
    <template #right>
      <div class="border-box">右侧内容</div>
    </template>
  </ResizelRLayout>
</template>

<script setup>
import ResizelRLayout from '../components/ResizelRLayout.vue'

</script>

<style scoped>
.border-box {
  border: 1px solid red;
  height: 100%;
  width: 100%;
}
</style>
