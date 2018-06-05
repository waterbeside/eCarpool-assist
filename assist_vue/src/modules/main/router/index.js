import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




// 定义路由
// 每个路由应该映射一个组件。 其中"component"是一个组件配置对象。
const routes = [
  // 主页
  {
    path: '',
    name: 'index',
    component (resolve) {
      require(['../pages/index'], resolve)
    },
    meta: {keepAlive: true }
  },
  {
    path: '/test',
    name: 'test',
    component (resolve) {
      require(['../pages/test'], resolve)
    },
    meta: {keepAlive: true }
  },
]

let router = new VueRouter({
  history: true,
  routes,
  mode: 'hash',
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})


export default router
