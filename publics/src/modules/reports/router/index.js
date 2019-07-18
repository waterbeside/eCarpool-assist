import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




// 定义路由
// 每个路由应该映射一个组件。 其中"component"是一个组件配置对象。
const routes = [
  // 主页
  {
    path: '/',
    redirect: {
      name: 'charts'
    }
  },
  // 图表
  {
    path: '/charts',
    name: 'charts',
    component (resolve) {
      require(['../pages/charts'], resolve)
    },
    meta: {keepAlive: true }
  },

  // 排行
  {
    path: '/ranking',
    name: 'ranking',
    component (resolve) {
      require(['../pages/ranking'], resolve)
    },
    meta: {keepAlive: true }
  },

  // 今日
  {
    path: '/today',
    name: 'today',
    component (resolve) {
      require(['../pages/today'], resolve)
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
