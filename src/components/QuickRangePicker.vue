<template>
  <a-range-picker v-model:value="modelValue" v-bind="$attrs">
    <template #renderExtraFooter>
      <div style="text-align:left;">
        <a-button size="small" @click="setRange(3)" style="margin: 0 4px;">最近3天</a-button>
        <a-button size="small" @click="setRange(7)" style="margin: 0 4px;">最近7天</a-button>
        <a-button size="small" @click="setRange(30)" style="margin: 0 4px;">最近一月</a-button>
      </div>
    </template>
  </a-range-picker>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

function setRange(days) {
  const end = dayjs()
  const start = dayjs().subtract(days - 1, 'day')
  modelValue.value = [start, end]
}
</script>

<style scoped>
</style> 