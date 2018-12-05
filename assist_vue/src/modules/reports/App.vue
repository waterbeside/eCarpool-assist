<template>
  <div class="cp-all">
    <div id="app">
      <transition :name="transitionName">
        <template v-if="$route.meta.keepAlive">
          <keep-alive>
              <router-view ></router-view>
          </keep-alive>
        </template>
        <template v-else>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
// const sessionHistory = window.sessionStorage
import config from '@/configs'
export default {
  name: 'app',
  data () {
    return {
      transitionName: '',
    }
  },


  watch: {
    // 更新页面所在位置，用于判断是前进页还是后退页

    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if(to.path=="/"){
        this.transitionName = 'backward'
        return;
      }


      this.transitionName = toDepth < fromDepth ? 'backward' : toDepth == fromDepth ? '' :'forward'
    }
  },
  methods :{
    init(){}
  },
  mounted () {
    this.init()
  },
  activated () {}
}
</script>
