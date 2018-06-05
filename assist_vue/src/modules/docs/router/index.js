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

  // 应用下载
  {
    path: '/score',
    name: 'score',
    component (resolve) {
      require(['../pages/score'], resolve)
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
