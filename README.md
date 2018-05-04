# vue-basic


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8082
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 一个小程序员自己构建的vue框架

# 在自己踩了无数的vue-cli的坑后，决定将自己觉得还算完整的一套vue基础框架发布上来

1.用fatch封装了请求，兼容ie，包括错误统一处理,使用async，await解决异步问题</br>
2.使用路由懒加载，小项目可以使用，大型项目必备</br>
3.引入了vuex，作为状态管理，想必使用vue的人都会vuex，这里只是构建好了目录，里面的内容自由发挥</br>
4.打包的时候解决了页面不显示，大图片加载不出来的问题</br>
5.添加了分条件打包，区分线上环境和测试环境</br>

