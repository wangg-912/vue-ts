<template>
  <div class="page-404-container">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <img :style="fixStyle" src="@/assets/404/404.svg" alt />
      </div>
      <video :style="fixStyle" class="fillWidth" muted autoplay loop>
        <source src="@/assets/404/Crocodile.mp4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
        <source src="@/assets/404/Crocodile.webm" type="video/webm" />浏览器不支持 video 标签，建议升级浏览器。
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" src="@/assets/404/404.svg" alt />
      </div>
    </div>
    <div class="text-404__info">请检查您输入的URL是否正确，或者单击下面的按钮返回主页。</div>
    <a href="/" class="text-404__return-home">
      <i class="material-icons">reply_all</i> 返回首页
    </a>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "ErrorPage"
})
export default class extends Vue {
  private vedioCanPlay: boolean = true;
  private fixStyle: string = "";
  mounted() {
    window.onresize = () => {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;
      const windowAspectRatio = windowHeight / windowWidth;
      let videoWidth;
      let videoHeight;
      if (windowAspectRatio < 0.5625) {
        videoWidth = windowWidth;
        videoHeight = videoWidth * 0.5625;
        this.fixStyle = {
          height: windowWidth * 0.5625 + "px",
          width: windowWidth + "px",
          "margin-bottom": (windowHeight - videoHeight) / 2 + "px",
          "margin-left": "initial",
          opacity: "0.6"
        };
      } else {
        videoHeight = windowHeight;
        videoWidth = videoHeight / 0.5625;
        this.fixStyle = {
          height: windowHeight + "px",
          width: windowHeight / 0.5625 + "px",
          "margin-left": (windowWidth - videoWidth) / 2 + "px",
          "margin-bottom": "initial",
          opacity: "0.6"
        };
      }
    };
    window.onresize();
  }
}
</script>
<style lang="scss" scoped>
.page-404-container,
.video-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.video-container .poster img,
.video-container video {
  z-index: 0;
  position: absolute;
}

.video-container .filter {
  z-index: 1;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
.page-404-container .text-404__info {
  position: absolute;
  z-index: 3;
  top: 10%;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  font-size: 16px;
  line-height: 32px;
  font-weight: 500;
  color: red;
}
.page-404-container .text-404__return-home {
  position: absolute;
  z-index: 3;
  top: 14%;
  text-align: center;
  margin: 0 auto;
  width: 100%;
  color: blue;
  text-decoration: underline;
}
</style>