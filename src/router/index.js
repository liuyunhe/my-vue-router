import Vue from 'vue'
import Router from '../myrouter'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'

Vue.use(Router)


// 思维 数据结构

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/test',
      name: 'Test',
      component: Test
    },
  ]
})

// {
//   '/': HelloWorld,
//   '/test': Test
// }



