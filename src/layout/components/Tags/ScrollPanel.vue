<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "ScrollPanel"
})
const tagSpacing = 4;
export default class extends Vue {
  private handleScroll(e: MouseWheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    const scrollConatiner = this.$refs.scrollContainer;
    const scrollWrapper = scrollConatiner.$refs.wrap;
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4;
  }
}
</script>
<style lang="scss">
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>
<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>

