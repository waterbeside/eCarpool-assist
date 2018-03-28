<template>
  <view-box ref="viewBox" id="Page-ranking" >
        <div class="page-view-content">
          <div>

              <h1 class="cp-title">上月拼车排名</h1>



            <div style="height:44px;">
              <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="0" :check-sticky-support="false">
                <tab :line-width="1" v-model="tabIndex">
                  <tab-item :key="0">司机</tab-item>
                  <tab-item :key="1">乘客</tab-item>
                </tab>
              </sticky>
            </div>
            <div v-show="tabIndex===0">
              <table class="table table-bordered table-striped">
                <thead class="cp-thead">
                  <tr>
                    <th>NO.</th>
                    <th>姓名</th>
                    <th>厂部</th>
                    <th>人次</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>a</td>
                    <td>get</td>
                    <td>0</td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div v-show="tabIndex===1">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>姓名</th>
                    <th>厂部</th>
                    <th>上月拼车次数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01</td>
                    <td>kan</td>
                    <td>$1.25</td>
                    <td>$1.25</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <p v-for="i in 100">{{i}}<br></p>
          </div>
          <cp-foot-nav-bar current="ranking"></cp-foot-nav-bar>

        </div>

   </view-box>

</template>

<script>
import config from '../../../configs'
import CpFootNavBar from '../components/CpFootNavBar'
import { Tab, TabItem, Sticky} from 'vux'

export default {
  components: {
    Tab, TabItem, Sticky, CpFootNavBar

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
