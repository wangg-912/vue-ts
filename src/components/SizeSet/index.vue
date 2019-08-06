<template>
  <el-dropdown trigger="click" @command="setSizeHandler">
    <div>
      <i class="material-icons">text_fields</i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in sizeOptions"
        :key="item.value"
        :disabled="size===item.value"
        :command="item.value"
      >{{item.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/stroe/module/app";
import { TagsViewModule } from "@/stroe/module/tagviews";
@Component({
  name: "SizeSet"
})
export default class extends Vue {
  private sizeOptions = [
    { label: "默认", value: "default" },
    { label: "中号", value: "medium" },
    { label: "小号", value: "small" },
    { label: "迷你", value: "mini" }
  ];

  get size() {
    return AppModule.size;
  }

  setSizeHandler(size: string) {
    (this as any).$ELEMENT.size = size;
    AppModule.setSize(size);
    this.refreshTagViews();
    this.$message({
      message: `全局字体设置成功！`,
      type: "success"
    });
  }

  refreshTagViews() {
    TagsViewModule.delAllCachedView();
    const { fullPath } = this.$route;
    this.$nextTick(() => {
      this.$router.replace({
        path: fullPath
      });
    });
  }
}
</script>


