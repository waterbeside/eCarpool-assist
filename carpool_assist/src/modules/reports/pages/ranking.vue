<template>
   <cp-view-box id="Page-ranking" :position="{bottom:'44px'}"    :enableInfinite="false" :enableRefresh="false" @on-scroll="onScroll" >

        <div class="page-view-content">
          <div>
            <h1 class="cp-title" :class="{'hasSticky':isSticky}"> 上月拼车排名</h1>
            <div style="height:44px;" :class="{'cp-sticky':isSticky}">
                <tab :line-width="1" v-model="tabIndex">
                  <tab-item :key="0">司机</tab-item>
                  <tab-item :key="1">乘客</tab-item>
                </tab>
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
                  <tr  v-for="(item,index) in rankingData_o"
                    :key="item.uid">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.companyname}}</td>
                    <td>{{item.num}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-show="tabIndex===1">
              <table class="table table-bordered">
                <thead class="cp-thead">
                  <tr>
                    <th>NO.</th>
                    <th>姓名</th>
                    <th>厂部</th>
                    <th>次数</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="(item,index) in rankingData_p"
                    :key="item.uid">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.companyname}}</td>
                    <td>{{item.num}}</td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

        </div>

        <cp-foot-nav-bar current="ranking"></cp-foot-nav-bar>
   </cp-view-box>
</template>

<script>
import config from '../../../configs'
import CpViewBox from '../../../components/CpViewBox'
import CpFootNavBar from '../components/CpFootNavBar'
import { Tab, TabItem, Sticky} from 'vux'

export default {
  components: {
    Tab, TabItem, Sticky, CpFootNavBar,CpViewBox

  },

  data () {
    return {
      showSpace: false,
      tabIndex:0,
      isSticky: false,
      rankingData_o: [],
      rankingData_p: [],
    }
  },
  computed : {


  },
  watch :{

    tabIndex (val,oldval){
      this.getRankingList(val);
      // this.changeStatus(this.detailData.status);
    },

  },
  methods :{
  /*  spaceChange () {
      this.showSpace = !this.showSpace
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    },*/
    /**
     * 取得排名
     * @param  {Integer} type  0 为司机排名， 1 为乘客排名。
     */
    getRankingList(type,recache){
      type = type || 0;
      if(!recache){
        if(type){
          if(this.rankingData_p.length > 0){
            return false;
          }
        }else{
          if(this.rankingData_o.length > 0){
            return false;
          }
        }
      }

      this.$vux.loading.show({ text: 'Loading' })
      this.$http.get(config.urls.reports.getMonthRanking,{params:{type:type}}).then((res)=>{
        if(res.data.code===0){
          let data = res.data.data
          if(type){
            this.rankingData_p = data.lists;
          }else{
            this.rankingData_o = data.lists;
          }
          this.$vux.loading.hide();

        }
        // console.log()
      }).catch(error => {
        this.$vux.loading.hide();
      })
    },

    onScroll(e){
       let sTop = e.target.scrollTop;
       if(sTop > 30){
         this.isSticky = true;
       }else{
         this.isSticky = false;
       }
     }





  },

  created () {

  },
  mounted () {
    this.getRankingList(this.tabIndex);

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">


</style>
