<template>
  <div class="navbar">
    <hamburger
      id="hamburger-wrapper"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <screentfull class="right-menu-item hover-effect" />
        <lang-set class="right-menu-item hover-effect" />
        <size-set class="right-menu-item hover-effect" />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <i class="material-icons icon-x3-big clr-primary">face</i>
          <i
            class="material-icons icon-x1"
            style="position:absolute;bottom:6px;right:-15px"
          >arrow_drop_down</i>
        </div>

        <el-dropdown-menu slot="dropdown">
          <router-link to>
            <el-dropdown-item>{{$t('navbar.mine')}}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AppModule } from "@/stroe/module/app";
import Hamburger from "@/components/Hamburger/index.vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Screentfull from "@/components/Screenfull/index.vue";
import LangSet from "@/components/LangSet/index.vue";
import SizeSet from "@/components/SizeSet/index.vue";
@Component({
  name: "Navbar",
  components: {
    Hamburger,
    Breadcrumb,
    Screentfull,
    LangSet,
    SizeSet
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

  private logout() {}
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

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
      }
    }
  }
}
</style>