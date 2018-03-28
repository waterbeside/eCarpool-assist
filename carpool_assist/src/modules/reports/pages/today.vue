<template>
  <view-box ref="viewBox" >
        <div class="page-view-content">
          <div>
          1
          </div>
        </div>
        <cp-foot-nav-bar current="today"></cp-foot-nav-bar>

   </view-box>

</template>

<script>
import config from '../../../configs'
import CpFootNavBar from '../components/CpFootNavBar'
import { Tab, TabItem} from 'vux'

export default {
  components: {
    Tab, TabItem,  CpFootNavBar

  },

  data () {
    return {
      showSpace: false,
      tabIndex:0
    }
  },
  computed : {


  },
  methods :{
    spaceChange () {
      this.showSpace = !this.showSpace
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    }


  },

  created () {

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

</style>
