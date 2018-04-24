<template>
   <cp-view-box id="Page-ranking"    @on-scroll="onScroll" >

        <div class="page-view-content">
          <div>
            <h1 class="cp-title"  > 上月拼车排名</h1>
            <div class="tab-head" >
                <tab :line-width="1" v-model="tabIndex">
                  <tab-item :key="0">司机</tab-item>
                  <tab-item :key="1">乘客</tab-item>
                </tab>
            </div>
            <div v-show="tabIndex===0">
              <v-table
                  is-horizontal-resize
                  style="width:100%; border:none"
                  is-vertical-resize
                  :vertical-resize-offset='42'
                  :columns="columns"
                  :table-data="rankingData_o"
                  :is-loading="isLoading_o"
                  row-hover-color="#eee"
                  row-click-color="#edf7ff"
              ></v-table>

            </div>

            <div v-show="tabIndex===1">
              <v-table
                  is-horizontal-resize
                  style="width:100%;border:none"
                  is-vertical-resize
                  :vertical-resize-offset='42'
                  :columns="columns"
                  :table-data="rankingData_p"
                  :is-loading="isLoading_p"
                  row-hover-color="#eee"
                  row-click-color="#edf7ff"
              ></v-table>

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
import {VTable} from 'vue-easytable';
import { Tab, TabItem} from 'vux'

export default {
  components: {
    Tab, TabItem, CpFootNavBar,CpViewBox,VTable

  },

  data () {
    return {
      showSpace: false,
      tabIndex:0,
      isSticky: false,
      isLoading_p: true,
      isLoading_o: true,
      rankingData_p: [],
      rankingData_o: [],
      columns: [
          {
              field: 'no', title:'#', width: 50, titleAlign: 'center', columnAlign: 'center',
              formatter: function (rowData,rowIndex,pagingIndex,field) {
                  return rowIndex < 3 ? '<span style="color:red;font-weight: bold;">' + (rowIndex + 1) + '</span>' : rowIndex + 1
              },isFrozen: true
          },
          {field: 'name', title:'名称',  width: 140,  titleAlign: 'center',columnAlign:'center'},
          // {field: 'uid', title: 'uid', width: 80, titleAlign: 'center',columnAlign:'center'},
          {field: 'companyname', title: '厂部', width: 100, titleAlign: 'center',columnAlign:'center'},
          {field: 'num', title: '人次', width: 84, titleAlign: 'center',columnAlign:'center'},
      ],

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
      this.isLoading_p =  true;
      this.isLoading_o =  true;
      this.$vux.loading.show({ text: 'Loading' })
      this.$http.get(config.urls.reports.getMonthRanking,{params:{type:type}}).then((res)=>{


        if(res.data.code===0){
          let data = res.data.data
          if(type){
            this.rankingData_p = data.lists;
          }else{
            this.rankingData_o = data.lists;
          }
          this.isLoading_o =  false;
          this.isLoading_p =  false;
          this.$vux.loading.hide();

        }
        // console.log()
      }).catch(error => {
        this.$vux.loading.hide();
        this.isLoading_o =  false;
        this.isLoading_p =  false;
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
