import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




// 定义路由
// 每个路由应该映射一个组件。 其中"component"是一个组件配置对象。
const routes = [
  // 设置register页面为首页
  {
    path: '/',
    redirect: {
      name: 'register',
      params:{link_code:0}
    }
  },
  // 注册页
  {
    path: '/register',
    redirect: {
      name: 'register',
      params:{link_code:0}
    }
  },
  // 注册页
  {
    path: '/reg/:link_code',
    redirect: {
      name: 'register',
    }
  },
  // 注册页
  {
    path: '/register/:link_code',
    name: 'register',
    component (resolve) {
      require(['../pages/register'], resolve)
    },
    meta: {keepAlive: true }
  },

  // 登入页
  {
    path: '/login',
    redirect: {
      name: 'login',
      params:{link_code:0}
    }
  },

  // 登入页
  {
    path: '/login/:link_code',
    name: 'login',
    component (resolve) {
      require(['../pages/login'], resolve)
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
