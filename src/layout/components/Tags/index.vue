<template>
  <div class="tags-view-container">
    <scroll-panel ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ $t(tag.meta.title) }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
      </router-link>
    </scroll-panel>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshTag(selectedTag)">{{$t('tagsView.refresh')}}</li>
      <li
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
        @click="closeCurrentTag(selectedTag)"
      >{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags(selectedTag)">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import path from "path";
import { Component, Vue, Watch } from "vue-property-decorator";
import VueRouter, { Route, RouteConfig, RouteRecord } from "vue-router";
import { PermissionModule } from "@/stroe/module/permission";
import { TagsViewModule, ITagsView } from "@/stroe/module/tagviews";
import ScrollPanel from "./ScrollPanel.vue";

@Component({
  name: "tagsView",
  components: {
    ScrollPanel
  }
})
export default class extends Vue {
  private visible: boolean = false;
  private left: number = 0;
  private top: number = 0;
  private selectedTag: ITagsView = {};
  private affixTags: ITagsView[] = [];
  get visitedViews() {
    return TagsViewModule.visitedviews;
  }
  get routes() {
    return PermissionModule.routes;
  }

  mounted() {
    this.initTags();
    this.addTags();
  }
  /**
   * 过滤固定tag
   */
  private filterAffixTags(routes: RouteConfig[], basePath = "/") {
    let tags: ITagsView[] = [];
    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = path.resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        });
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path);
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags];
        }
      }
    });
    return tags;
  }
  /**
   * 初始化tag view
   */
  private initTags() {
    this.affixTags = this.filterAffixTags(this.routes);

    for (const tag of this.affixTags) {
      // 备注 必须有tag.name
      if (tag.name) {
        TagsViewModule.addVisitedView(tag);
      }
    }
  }
  /**
   * 新建tag
   */
  private addTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    return false;
  }
  /**
   * 当前tag添加标识
   */
  private isActive(route: ITagsView) {
    return (route.path = this.$route.path);
  }
  /**
   * 刷新tag
   */
  private refreshTag(tag: ITagsView) {
    TagsViewModule.delCacheView(tag);
    const { fullPath } = tag;
    this.$nextTick(() => {
      this.$router.replace({
        path: fullPath
      });
    });
  }
  /**
   * 关闭当前tag
   */
  private closeSelectedTag(tag: ITagsView) {}
  /**
   * 关闭其他tag
   */
  private closeOthersTags() {}
  /**
   * 关闭所有tag
   */
  private closeAllTags(view: ITagsView) {}
  /**
   * 打开右键菜单
   */
  private openMenu(tag: ITagsView, e: MouseEvent) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.top = e.clientY;
    this.visible = true;
    this.selectedTag = tag;
  }
  /**
   * 关闭右键菜单
   */
  private closeMenu() {
    this.visible = false;
  }
}
</script>
<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

