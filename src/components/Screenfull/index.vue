<template>
  <div id="screenfull">
    <i class="material-icons" @click="click">{{isFullScreen?'fullscreen_exit':'fullscreen'}}</i>
  </div>
</template>
<script lang="ts">
import screenfull from "screenfull";
import { Component, Vue } from "vue-property-decorator";
const sfl = screenfull;
@Component({
  name: "Screenfull"
})
export default class extends Vue {
  private isFullScreen: boolean = false;
  mounted() {
    if (sfl && sfl.enabled) {
      sfl.on("change", this.change);
    }
  }
  beforeDestroy() {
    if (sfl && sfl.enabled) {
      sfl.on("change", this.change);
    }
  }
  private change() {
    if (sfl && sfl.enabled) {
      this.isFullScreen = sfl.isFullscreen;
    }
  }
  private click() {
    if (sfl) {
      if (!sfl.enabled) {
        this.$message({
          message: "对不起，您的浏览不支持！",
          type: "warning"
        });
      }
      sfl.toggle();
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

