<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>

<template>
    <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>


<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
