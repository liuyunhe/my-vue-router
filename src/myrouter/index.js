

class HistoryRouter {
  constructor() {
    this.current = null
  }
}

// 注入vue实例
class VueRouter {
  constructor(options) {
    // this.$options.router里的key
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    this.routesMap = this.createMap(this.routes)
    this.history = new HistoryRouter()
    this.init()
  }
  init() {
    if(this.mode == 'hash'){
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = location.hash.slice(1)
      })
    }else {
      // location.pathname ? '' : '/'
      // window.addEventListener('load', () => {
      //   this.history.current = location.pathname
      // })
      // window.addEventListener('onpopstate', () => {
      //   this.history.current = location.pathname
      // })
    }
  }
  createMap(routes) {
    return routes.reduce((memo,current) => {
      memo[current.path] = current.component
      return memo
    },{})
  }
}


// 注入vue生命周期
VueRouter.install = (vue) => {
  // 单例模式
  if(VueRouter.install.installed) return
  VueRouter.install.installed = true
  vue.mixin({
    beforeCreate() {
      // console.log("i am mixin",this)
      // main -> app.vue -> 组件
      if(this.$options && this.$options.router){   // 在这一段只有main.js会执行    //  $options = export default 里的选项
        this._root = this
        this._router = this.$options.router
        vue.util.defineReactive(this, 'current', this._router.history)  // 监视 _router.history 双向绑定
      }else {
        // app.vue._root -> main._root
        // 组件._root -> app.vue._root -> main._root
        // 即每个组件的._root始终指向根实例._root
        console.log(this)
        this._root = this.$parent._root || this.$root
      }
      // this.$route this.$router
      // 变量权限思路
      Object.defineProperty(this, '$router', {
        get() {
          return this._root._router
        }
      })
      Object.defineProperty(this, '$route', {
        get() {
          return this._root._router.history.current
        }
      })

    }
  })
  // current监视 -> current变量一变渲染 -> render获取到current是什么 -> 对应current组件
  vue.component('router-view',{
    render(h){
      // console.log(this._self._root._router.history)
      let current = this._self._root._router.history.current
      let routerMap = this._self._root._router.routesMap
      return h(routerMap[current])
    }
  })
}

export default VueRouter
