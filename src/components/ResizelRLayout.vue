<template>
  <div class="box" ref="box">
    <div class="left cus-scroll">
      <!--左侧div内容-->
      <slot name="left"></slot>
    </div>
    <div class="resize" title="收缩侧边栏">⋮</div>
    <div class="right">
      <!--右侧div内容-->
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      activeTabs: 1
    })
    onMounted(() => {
      dragControllerDiv()
    })
    function dragControllerDiv() {
      let resize = document.getElementsByClassName('resize')
      let boxDom = document.getElementsByClassName('box')
      let leftDom = document.getElementsByClassName('left')
      let rightDom = document.getElementsByClassName('right')
      for (let i = 0; i < resize.length; i++) {
        /*鼠标 按下拖拽区 */
        resize[i].onmousedown = function (e) {
          // 拖拽区 变色
          resize[i].style.background = '#818181'
          // 防止选中文本
          document.body.style.userSelect = 'none'
          // 拖拽区 开始的距离  403
          var startX = e.clientX
          // 左边大小 放入 resize
          resize[i].left = resize[i].offsetLeft
          /* 鼠标拖拽 */
          document.onmousemove = function (ee) {
            // 拖拽区 结束的距离
            var endX = ee.clientX
            // 移动的距离 （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
            let leftWidth = resize[i].left + (endX - startX)
            // 右边最大宽度
            let maxWidth = boxDom[i].clientWidth - resize[i].offsetWidth
            /* 设置 左边 最小值 */
            if (leftWidth < 400) leftWidth = 400
            if (leftWidth > maxWidth - 400) leftWidth = maxWidth - 400
            // 设置拖拽条 距离左侧区域的宽度
            resize[i].style.left = leftWidth
            // 设置 左边宽度
            leftDom[i].style.width = leftWidth + 'px'
            // 设置右边宽度
            rightDom[i].style.width = boxDom[i].clientWidth - leftWidth - 10 + 'px'
          }
          /* 鼠标松开 */
          document.onmouseup = function () {
            // 取消事件
            document.onmousemove = null
            document.onmouseup = null
            // 恢复颜色
            resize[i].style.background = '#d6d6d6'
            // 恢复文本选择
            document.body.style.userSelect = ''
          }
        }

        return false
      }
    }
    return {
      ...toRefs(state)
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
</style>
