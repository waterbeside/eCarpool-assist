<template>

   <view-box id="Page-today"       >
        <div class="page-view-content">
          <h1 class="cp-title" > 今日拼车
            <div class="cp-total"> 今日拼车数 {{listTotal}}</div>
          </h1>
          <div class="tabble-wrapper" style="position: absolute; top:35px; right:0; bottom:0;  left:0;">
            <v-table
              is-horizontal-resize
              style="width:100%; "
              is-vertical-resize
              :vertical-resize-offset='42'
              :columns="columns"
              :table-data="listData"

              :is-loading="isLoading"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
      ></v-table>
          </div>


        </div>
        <cp-foot-nav-bar current="today"></cp-foot-nav-bar>
   </view-box>
</template>

<script>
import config from '../../../configs'
import CpViewBox from '../../../components/CpViewBox'
import CpFootNavBar from '../components/CpFootNavBar'
import {VTable} from 'vue-easytable';

export default {
  components: {
      CpFootNavBar,CpViewBox,VTable
  },
  data () {
    return {
      isLoading:true,
      listData: [  ],
      field_width: 130,
      field_width_2: 90,

    }
  },
  computed : {
    listTotal (){
      return this.listData.length;
    },
    columns (){
      return [
        {field: 'carnumber', title:'车牌', width: 100, titleAlign: 'center',columnAlign:'center'},
        {field: 'name_o', title: '司机', width: this.field_width, titleAlign: 'center',columnAlign:'center'},
        {field: 'companyname_o', title: '厂部', width: this.field_width_2, titleAlign: 'center',columnAlign:'center'},
        {field: 'name_p', title: '乘客', width: this.field_width, titleAlign: 'center',columnAlign:'center'},
        {field: 'companyname_p', title: '厂部', width: this.field_width_2, titleAlign: 'center',columnAlign:'center'},
        {field: 'date_time', title: '时间', width: 160, titleAlign: 'center',columnAlign:'center'}
        ]
    }
  },
  watch :{

  },
  methods :{
    /**
     * 取得列表
     */
    getList(){
      this.isLoading = true;
      this.$vux.loading.show({ text: 'Loading' })
      this.$http.get(config.urls.reports.getTodayInfo).then((res)=>{
        this.isLoading = false;
        if(res.data.code===0){
          let data = res.data.data
          this.listData = data.lists;
          this.$vux.loading.hide();

        }
        // console.log()
      }).catch(error => {
        this.isLoading = false;
        this.$vux.loading.hide();
      })
    },

  },

  created () {

  },
  mounted () {
    this.getList();
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(w>700){
      this.field_width = (w - 260)/4+50;
      this.field_width_2 = (w - 260)/4-50;
    }

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">


</style>
