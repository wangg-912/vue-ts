<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 10:13:08
 * @LastEditTime: 2019-08-29 14:22:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="to">
    <slot />
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { isExternal } from "@/utils/validate";

@Component({
  name: "SidebarItemLink"
})
export default class extends Vue {
  @Prop({ required: true }) private to!: string;

  private isExternal = isExternal;
}
</script>