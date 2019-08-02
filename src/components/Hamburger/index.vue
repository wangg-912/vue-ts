<template>
  <div :class="[{'is-active': isActive}]" @click="toggleClick">
    <i class="material-icons">view_list</i>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "Hamburger"
})
export default class extends Vue {
  @Prop({ default: false }) private isActive!: boolean;

  private toggleClick() {
    //TODO 调取父级功能
    this.$emit("toggleClick");
  }
}
</script>
<style lang="scss" scoped>
.material-icons {
  vertical-align: middle;
}
.hamburger-container {
  transform: rotate(90deg);
}
.hamburger-container.is-active {
  transform: rotate(0deg);
}
</style>

