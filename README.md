## 简介（Introduction)

基于vue3的自定义webpack项目,支持单文件组件、jsx、tsx组件

## 技术栈（Scheme）

vue3 + typescript + webpack5 + less

## 项目设计结构

```js
.
├── README.md
├── babel.config.js // babel配置
├── config
│   ├── webpack.base.config.js // 基础webpack配置
│   ├── webpack.dev.config.js // 开发环境webpack配置
│   └── webpack.prod.config.js // 生产webpack配置
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   ├── HelloWorld.vue
│   │   ├── compositionApi.vue
│   │   ├── compositionTsApi.vue
│   │   ├── hello.module.css
│   │   ├── hello.module.less
│   │   ├── setUpApi.vue
│   │   └── setUpJsxApi.jsx
│   ├── index.less
│   ├── main.css
│   ├── main.ts
│   ├── router
│   │   └── index.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   └── index.ts
│   └── views
│       ├── AboutView.vue
│       ├── HomeView.vue
│       ├── UserView.vue
│       ├── demo.jsx
│       └── demo2.tsx
├── tsconfig.json
└── yarn.lock
```

## 使用（Usage）

### 克隆仓库
 
git clone git@github.com:willson-wang/webpack-vue3-demo.git
 
### 安装依赖
 
pnpm install
 
### 构建模式

开发环境
```
pnpm dev
```

生产环境
```
pnpm build
```

