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
          <router-view ></router-view>
        </template>
      </transition>
    </div>
  </div>
</template>

<script>
const sessionHistory = window.sessionStorage
import config from '@/configs'
export default {
  name: 'app',
  data () {
    return {
      transitionName: '',
    }
  },
  computed: {

    },

  watch: {
    // 更新页面所在位置，用于判断是前进页还是后退页

    '$route' (to, from) {
      var paramLang = to.params.language;
      if(paramLang){
        this.$store.dispatch('updateParamLang',paramLang);
      }else{
        this.$store.dispatch('updateParamLang',null);
      }
      if (to.meta.title) {
        document.title = to.meta.title;
      }else{
        document.title = '说明';
      }
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
    init(){
    }
  },
  mounted () {
    this.init()
  },
  activated () {


  }
}
</script>
