import {VuexModule, Module, Mutation, Action, getModule} from "vuex-module-decorators"
import {Route} from 'vue-router'
import store from '@/stroe'

export interface ITagsView extends Partial < Route > {
    title?: string
}
export interface ITagsViewsState {
    visitedviews : ITagsView[]
    cachedviews : (string | undefined)[]
}

@Module({dynamic: true, store, name: 'TagsView'})
class TagsView extends VuexModule implements ITagsViewsState {
    public visitedviews : ITagsView[] = [];
    public cachedviews : (string | undefined)[] = [];
    /**
     * 新增tagView的视图队列
     */
    @Mutation private ADD_VISITED_VIEW(view : ITagsView) {
        if (this.visitedviews.some(v => v.path == view.path)) 
            return
        this
            .visitedviews
            .push(Object.assign({}, view))
    }
    /**
     * 新增tagView的视图名称
     */
    @Mutation private ADD_CACHED_VIEW(view : ITagsView) {
        if (this.cachedviews.includes(view.name)) 
            return
        if (!view.meta.noChache) {
            this
                .cachedviews
                .push(view.name)
        }
    }
    /**
     * 更新当前tagView的数据
     */
    @Mutation private UPDATE_VISITED_VIEW(view : ITagsView) {
        for (let v of this.visitedviews) {
            if (v.path == view.name) {
                v = Object.assign(v, view);
                break;
            }
        }
    }
    /**
     * 删除当前tagView
     */
    @Mutation private DEL_VISITED_VIEW(view : ITagsView) {
        for (const [i,
            v]of this.visitedviews.entries()) {
            if (v.path == view.path) {
                this
                    .visitedviews
                    .splice(i, 1);
                break;
            }
        }
    }
    /**
     * 删除当前缓存队列 tagName
     */
    @Mutation private DEL_CACHED_VIEW(view : ITagsView) {
        for (const [i,
            v]of this.cachedviews.entries()) {
            if (v == view.name) {
                this
                    .cachedviews
                    .splice(i, 1);
                break;
            }
        }
    }
    /**
     * 删除其他visitedView 中非当前tags
     */
    @Mutation private DEL_OTHERS_VISITED_VIEW(view : ITagsView) {
        this.visitedviews = this
            .visitedviews
            .filter(v => {
                return v.meta.affix || v.path == view.path
            })
    }
    /**
     * 删除其他 cacheView中的非当前的tag
     */
    @Mutation private DEL_OTHERS_CACHED_VIEW(view : ITagsView) {
        for (const [i,
            v]of this.cachedviews.entries()) {
            if (v == view.path) {
                this.cachedviews = this
                    .cachedviews
                    .slice(i, i + 1);
                break;
            }
        }
    }
    /**
     * 删除所有tagsView的视图数据，但是排除预置tag
     */
    @Mutation private DEL_ALL_VISITED_VIEW() {
        const affixArr = this
            .visitedviews
            .filter(v => v.meta.affix);
        this.visitedviews = affixArr;
    }
    /**
     * 清空所有cacheView中的tagName
     */
    @Mutation private DEL_ALL_CACHED_VIEW() {
        this.cachedviews = [];
    }

    @Action addView(view : ITagsView) {
        this.ADD_VISITED_VIEW(view);
        this.ADD_CACHED_VIEW(view);
    }
    @Action addVisitedView(view : ITagsView) {
        this.ADD_VISITED_VIEW(view);
    }
    @Action updateVisitedView(view : ITagsView) {
        this.UPDATE_VISITED_VIEW(view);
    }
    @Action delView(view : ITagsView) {
        this.DEL_VISITED_VIEW(view);
        this.DEL_CACHED_VIEW(view);
    }
    @Action delCacheView(view : ITagsView) {
        this.DEL_CACHED_VIEW(view);
    }
    @Action delOthersViews(view : ITagsView) {
        this.DEL_OTHERS_VISITED_VIEW(view);
        this.DEL_OTHERS_CACHED_VIEW(view);
    }
    @Action delAllViews() {
        this.DEL_ALL_VISITED_VIEW();
    }
    @Action delAllCachedView() {
        this.DEL_ALL_CACHED_VIEW();
    }
}

export const TagsViewModule = getModule(TagsView);