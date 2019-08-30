<!--
 * @Description: 功能描述
 * @Author: 作者
 * @Github: https: //github.com/xxx
 * @Date: 2019-08-06 13:42:00
 * @LastEditors: 最后编辑人
 * @LastEditTime: 2019-08-30 10:44:38
 -->
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

const tagSpacing = 4;
@Component({
  name: "ScrollPanel"
})
export default class extends Vue {
  private handleScroll(e: MouseWheelEvent) {
    const eventDelta = (e as any).wheelDelta || -e.deltaY * 40;
    const scrollConatiner = this.$refs.scrollContainer as Vue;
    const scrollWrapper = scrollConatiner.$refs.wrap as HTMLElement;
    scrollWrapper.scrollLeft = scrollWrapper.scrollLeft + eventDelta / 4;
  }

  moveToTarget(currentTag: HTMLElement) {
    const scrollContainer = this.$refs.scrollContainer as Vue;
    const container = scrollContainer.$el as HTMLElement; //tag 容器
    const containerWidth = container.offsetWidth; //tags容器的宽度
    const scrollWrapper = scrollContainer.$refs.wrap as HTMLElement; //scroll panel隐藏组件

    const tagList = this.$parent.$refs.tag as any[]; //获取tag队列
    let firstTag = null;
    let lastTag = null;
    /**
     * 找到第一个和最后一个tag
     */
    if (tagList.length > 0) {
      firstTag = tagList[0];
      lastTag = tagList[tagList.length - 1];
    }
    if (firstTag == currentTag) {
      scrollWrapper.scrollLeft = 0;
    } else if (lastTag === currentTag) {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - containerWidth;
    } else {
      //找到当前节点的前一个tag和后一个tag
      const currentIndex = tagList.findIndex(item => item == currentTag);
      const prevTag = tagList[currentIndex - 1];
      const nextTag = tagList[currentIndex + 1];

      // tag的居左距离在nextTag之后
      const afterNextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing;
      // tag的居左距离在nextTag之前
      const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing;

      if (afterNextTagOffsetLeft > scrollWrapper.scrollLeft + containerWidth) {
        scrollWrapper.scrollLeft = afterNextTagOffsetLeft - containerWidth;
      } else if (beforePrevTagOffsetLeft < scrollWrapper.scrollLeft) {
        scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
      }
    }
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

