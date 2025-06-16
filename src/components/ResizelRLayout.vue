<template>
  <div class="box" ref="box">
    <div class="left cus-scroll" :style="{width: leftWidth + 'px'}" ref="left">
      <!--左侧div内容-->
      <slot name="left"></slot>
      <div v-if="!showRight" class="right-box" @click="openRight">
        打开右侧
      </div>
    </div>
    <div v-if="showRight" class="resize" title="收缩侧边栏" ref="resize">⋮</div>
    <div v-if="showRight" class="right" ref="right">
      <!--右侧div内容-->
      <div class="right-box" @click="closeRight">
        X
      </div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, ref, nextTick } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      activeTabs: 1,
      showRight: true
    })
    const box = ref(null)
    const left = ref(null)
    const right = ref(null)
    const resize = ref(null)
    // 新增：响应式宽度
    const leftWidth = ref(0)
    // 默认宽度
    const DEFAULT_LEFT = 0.6 // 60%
    const MIN_LEFT = 400
    const MIN_RIGHT = 400
    const RESIZE_WIDTH = 10

    onMounted(() => {
      nextTick(() => {
        // 初始化宽度
        if (box.value) {
          leftWidth.value = box.value.clientWidth * DEFAULT_LEFT
        }
        bindDrag()
      })
    })

    function bindDrag() {
      if (!resize.value) return
      let dragging = false
      let startX = 0
      let startLeft = 0
      let animationFrame = null
      const onMouseMove = (ee) => {
        if (!dragging) return
        if (!state.showRight) return
        const boxWidth = box.value.clientWidth
        let newLeft = startLeft + (ee.clientX - startX)
        let maxLeft = boxWidth - RESIZE_WIDTH - MIN_RIGHT
        if (newLeft < MIN_LEFT) newLeft = MIN_LEFT
        if (newLeft > maxLeft) newLeft = maxLeft
        leftWidth.value = newLeft
      }
      const onMouseMoveRAF = (ee) => {
        if (animationFrame) cancelAnimationFrame(animationFrame)
        animationFrame = requestAnimationFrame(() => onMouseMove(ee))
      }
      resize.value.onmousedown = function (e) {
        if (!state.showRight) return
        dragging = true
        startX = e.clientX
        startLeft = leftWidth.value
        document.body.style.userSelect = 'none'
        window.addEventListener('mousemove', onMouseMoveRAF)
        window.addEventListener('mouseup', onMouseUp)
      }
      function onMouseUp() {
        dragging = false
        document.body.style.userSelect = ''
        window.removeEventListener('mousemove', onMouseMoveRAF)
        window.removeEventListener('mouseup', onMouseUp)
      }
    }

    function closeRight() {
      state.showRight = false
      nextTick(() => {
        if (box.value) leftWidth.value = box.value.clientWidth
      })
    }
    function openRight() {
      state.showRight = true
      nextTick(() => {
        if (box.value) leftWidth.value = box.value.clientWidth * DEFAULT_LEFT
        bindDrag()
      })
    }
    return {
      ...toRefs(state),
      closeRight,
      openRight,
      box,
      left,
      right,
      resize,
      leftWidth
    }
  }
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  width: 60%;
  transition: width 0.3s;
}
.right {
  width: 40%;
  flex: 1;
  position: relative;
}
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background: blue;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 50px;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
.right-box {
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}
</style>
