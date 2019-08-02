<template>
  <div class="navbar">
    <hamburger
      id="hamburger-wrapper"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModule } from "@/stroe/module/app";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
@Component({
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb
  }
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get device() {
    return AppModule.device.toString();
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }
}
</style>