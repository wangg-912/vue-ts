<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig, RouteRecord } from "vue-router";
import { PermissionModule } from "@/stroe/module/permission";
import { TagsViewModule, ITagsView } from "@/stroe/module/tagviews";
@Component({
  name: "TagsItem",
  components: {}
})
export default class extends Vue {}
</script>
