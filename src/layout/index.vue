<template>
  <el-container>
    <el-aside width="220px">
      <menu-aside />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MenuAside from "./components/Aside.vue";
@Component({
  components: {
    MenuAside
  }
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
.full-container {
  height: inherit;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  text-align: center;
  line-height: 200px;
  padding: 0px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  height: 100%;
}
</style>

