# vue-ts

## 基于 typescript 3.4.3、Vue Cli3.x、axios、element-ui 为基础项。实现国际化，全|缩屏，全局控件大小等系统管理平台。

## 项目结构

│ .browserslistrc
│ .env.development
│ .env.production
│ .eslintrc.js
│ .gitignore
│ babel.config.js
│ package.json
│ postcss.config.js
│ README.md
│ tree.text
│ tsconfig.json
│ vue.config.js
│ yarn-error.log
│ yarn.lock  
├─public
│ │ favicon.ico
│ │ index.html
│ │ manifest.json
│ │ robots.txt
│ │  
│ └─img
│ └─icons
│ android-chrome-192x192.png
│ android-chrome-512x512.png
│ apple-touch-icon-120x120.png
│ apple-touch-icon-152x152.png
│ apple-touch-icon-180x180.png
│ apple-touch-icon-60x60.png
│ apple-touch-icon-76x76.png
│ apple-touch-icon.png
│ favicon-16x16.png
│ favicon-32x32.png
│ msapplication-icon-144x144.png
│ mstile-150x150.png
│ safari-pinned-tab.svg
│  
├─src
│ │ App.vue
│ │ favicon.ico
│ │ main.ts
│ │ registerServiceWorker.ts
│ │ settings.ts
│ │ shims-tsx.d.ts
│ │ shims-vue.d.ts
│ │  
│ ├─api
│ │ app.ts
│ │  
│ ├─assets
│ │ │ logo.png
│ │ │  
│ │ └─404
│ │ 404.svg
│ │ Crocodile.jpg
│ │ Crocodile.mp4
│ │ Crocodile.ogv
│ │ Crocodile.webm
│ │  
│ ├─components
│ │ ├─Breadcrumb
│ │ │ index.vue
│ │ │  
│ │ ├─Hamburger
│ │ │ index.vue
│ │ │  
│ │ ├─LangSet
│ │ │ index.vue
│ │ │  
│ │ ├─Screenfull
│ │ │ index.vue
│ │ │  
│ │ ├─SettingPanel
│ │ │ index.vue
│ │ │  
│ │ ├─SizeSet
│ │ │ index.vue
│ │ │  
│ │ └─ThemeConfig
│ │ index.vue
│ │  
│ ├─config
│ │ index.ts
│ │  
│ ├─lang
│ │ en.ts
│ │ index.ts
│ │ zh.ts
│ │  
│ ├─layout
│ │ │ index.vue
│ │ │  
│ │ ├─components
│ │ │ │ AppMain.vue
│ │ │ │ index.ts
│ │ │ │  
│ │ │ ├─GlobalSet
│ │ │ │ index.vue
│ │ │ │  
│ │ │ ├─Navbar
│ │ │ │ index.vue
│ │ │ │  
│ │ │ ├─Sidebar
│ │ │ │ index.vue
│ │ │ │ SidebarItem.vue
│ │ │ │ SidebarItemLink.vue
│ │ │ │ SidebarLogo.vue
│ │ │ │  
│ │ │ └─Tags
│ │ │ index.vue
│ │ │ ScrollPanel.vue
│ │ │  
│ │ └─mixin
│ │ resizeMixin.ts
│ │  
│ ├─router
│ │ index.ts
│ │  
│ ├─stroe
│ │ │ index.ts
│ │ │  
│ │ └─module
│ │ app.ts
│ │ permission.ts
│ │ setting.ts
│ │ tagviews.ts
│ │ user.ts
│ │  
│ ├─styles
│ │ buttons.scss
│ │ common.scss
│ │ element-varibles.scss
│ │ index.scss
│ │ mixin.scss
│ │ sidebar.scss
│ │ transition.scss
│ │ variables.scss
│ │  
│ ├─utils
│ │ axios.request.ts
│ │ commit.ts
│ │ cookies.ts
│ │ validate.ts
│ │  
│ └─views
│ │ About.vue
│ │ Home.vue
│ │  
│ └─404
│ Page404.vue
│  
├─tests
│ └─unit
│ example.spec.ts
│  
└─webApp
│ favicon.ico
│ index.html
│ manifest.json
│ precache-manifest.30dcc2ea0e1c28f9f87a96ab1ee3e4a6.js
│ robots.txt
│ service-worker.js
│  
 ├─assets
│ ├─css
│ │ app.fbe370ba.css
│ │  
 │ ├─img
│ │ logo.82b9c7a5.png
│ │  
 │ └─js
│ about.fee61e86.js
│ app.8d2ad3f2.js
│ chunk-vendors.137a8fe4.js
│  
 └─img
└─icons
android-chrome-192x192.png
android-chrome-512x512.png
apple-touch-icon-120x120.png
apple-touch-icon-152x152.png
apple-touch-icon-180x180.png
apple-touch-icon-60x60.png
apple-touch-icon-76x76.png
apple-touch-icon.png
favicon-16x16.png
favicon-32x32.png
msapplication-icon-144x144.png
mstile-150x150.png
safari-pinned-tab.svg

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```
