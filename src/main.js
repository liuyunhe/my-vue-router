// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

var a = function () {
  console.log(1)
}

a.install = function (vue) {
  // vue的类
  console.log(2)
  vue.mixin({
    // data(){
    //     //   return {
    //     //     a: 1
    //     //   }
    //     // }
    beforeCreate() {
      console.log("i am mixin",this)
    }
  })
}

// Vue.use(a)
// 你给他什么（方法）他执行什么，如果有install属性（对象）则执行install属性

new Vue({
  el: '#app',
  router,    // this.&options.router
  components: { App },
  template: '<App/>'
})

// vuex,vue-router原理
// 就是把一段逻辑，注入到组件的生命周期
