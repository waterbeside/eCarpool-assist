<template>

  <div class="cp-footNavBar"  id="footer">
    <div   class="router-link cp-bar-tab-item" :class="{'active' : current=='charts'}">
      <router-link :to="{ name: 'charts' }" class="cp-item-link">
        <i class="cp-iconfont fa fa-line-chart"></i>
        <div class="cp-bar-tab-label">{{$t("message.reports.Report")}}</div>
      </router-link>
    </div>
    <div   class="router-link cp-bar-tab-item" :class="{'active' : current=='ranking'}">
      <router-link :to="{ name: 'ranking' }" class="cp-item-link">
        <i class="cp-iconfont fa fa-bar-chart"></i>

        <div class="cp-bar-tab-label">{{$t("message.reports.Ranking")}}</div>
      </router-link>
    </div>
    <div   class="router-link cp-bar-tab-item" :class="{'active' : current=='today'}">
      <router-link :to="{ name: 'today' }" class="cp-item-link">
        <i class="cp-iconfont fa fa-calendar"></i>
        <div class="cp-bar-tab-label">{{$t("message.reports.Today")}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    }
  },
  props: [ 'current'],
  computed: {

  },
  methods: {

  }
}
</script>
<style lang="less"  scoped>
  .cp-footNavBar { position: absolute; bottom: 0; width: 100%; display: flex; background: #FFF; border-top: 1px solid #eee; box-shadow: 0 0px 8px rgba(0,0,0,0.1);}
  .cp-item-link { color:#aaa;   }
  .cp-bar-tab-item { display: flex; flex-direction: column; font-size: 12px;justify-content:center;flex:1; padding:4px;text-align: center;
    svg.cp-iconfont {height: 20px; fill:#aaa; margin-bottom: -4px;}
    &.active {
      font-weight: 700;
      .cp-item-link {  color:rgb(140, 89, 205) }
      svg.cp-iconfont { fill:rgb(140, 89, 205); }
    }
  }
  .p {margin: 0}
</style>
