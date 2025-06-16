<template>
  <div>
    <div style="position:fixed; top:0; right:0;">
      <div
        v-for="nav in navs"
        :key="nav.id"
        :class="['nav-item', { active: activeNav === nav.id }]"
        @click="handleNavClick(nav.id)"
      >
        {{ nav.label }}
      </div>
    </div>
    <h1 id="title1">标题1</h1>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <p>内容1</p>
    <h1 id="title2">标题2</h1>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p> 
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p> 
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p>
    <p>内容2</p> 
    <h1 id="title3">标题3</h1>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <p>内容3</p>
    <router-link to="/">回到 Home</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const navs = [
  { id: 'title1', label: 'nav1111' },
  { id: 'title2', label: 'nav2' },
  { id: 'title3', label: 'nav3' }
]
const activeNav = ref('title1')

function handleNavClick(id) {
  activeNav.value = id
  scrollTo(id)
}
function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
function onScroll() {
  const ids = navs.map(nav => nav.id)
  let current = ids[0]
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i])
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100) {
        current = ids[i]
      }
    }
  }
  activeNav.value = current
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav-item {
  display: inline-block;
  margin-right: 8px;
  cursor: pointer;
}
.active {
  color: #fff;
  background: #409EFF;
  border-radius: 4px;
  padding: 2px 8px;
}
</style>
