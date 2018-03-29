<template>
  <view-box ref="viewBox" id="Page-charts">
        <div class="page-view-content">
          <div class="row cp-statis-wrapper">
            <div class="cp-statis-item col-xs-6">
              <statis-item  :num="statis.people"   icon="fa fa-male" :duration="1">
                <div slot="title" class="title">总拼车人次</div>
              </statis-item>
            </div>
            <div class="cp-statis-item col-xs-6">
              <statis-item   :num="statis.carbon"   icon="fa fa-leaf" :duration="1">
                <div slot="title" class="title">减少碳排放(KG)</div>
              </statis-item>
            </div>
          </div>
          <div id="chart"  class="cp-chart-content" ></div>
        </div>
        <cp-foot-nav-bar current="charts"></cp-foot-nav-bar>
   </view-box>
</template>

<script>
import config from '../../../configs'
import StatisItem from '../../../components/StatisItem'
import CpFootNavBar from '../components/CpFootNavBar'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

export default {
  components: {
      CpFootNavBar,StatisItem

  },

  data () {
    return {
      statis:{
        people:0,
        distance:0,
        carbon:0
      },
      //构设图表的设置。
      chartOption: {
        title: {
            text: '拼车统计',
            padding: [8,4,4,8],
            textStyle:{color:"#74697e"}
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                label: {
                    backgroundColor: '#692290'
                }
            }
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
                start: 30,
                end: 100
            },
            {
                type: 'inside',
                realtime: true,
                start: 0,
                end: 100
            }
        ],
        legend: {
          top:8,
          right:10,
        },
        grid: {
          top: '44px',
           left: '3%',
           right: '8%',
           bottom: '50px',
           containLabel: true
       },

         xAxis: {
             type: 'category',
             boundaryGap : true,
             data: ['2018', '2017']
         },
         yAxis: {type: 'value'},
         series: [
             {
                 type: 'line',
                 name: '总乘客人次 ',
                 label: {
                    normal: { show: true, position: 'top', color:"#226728" }
                 },
                 areaStyle: {normal: {}},
                 itemStyle: {    color: '#65b6af' },
                  smooth: true,
                 data: [0,0]
             },
             {
                 type: 'line',
                 name: '总司机人次',
                 label: {
                    normal: {   show: true, position: 'top',  color:"#794a32" }
                 },
                 areaStyle: {normal: {}},
                 itemStyle: {    color: '#ec7751' },
                  smooth: true,
                 data: [0, 0]
             },
         ]
      }
    }
  },
  computed : {


  },
  methods :{
    /**
     * 绘制图表
     * @param  {string} id 绘制目标的容器ID
     */
    drawChart(id){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption(this.chartOption);

    },
    /**
     * [getStatis 取得总行程数目数据。]
     */
    getStatis (){
      this.$http.get(config.urls.reports.reputationSummary).then((res)=>{
        let data = res.data[0];
        this.statis.people = data.sumtrip;
        this.statis.carbon = data.sumtrip *7.6*2.3/10 ;
      }).catch(error => {

      })
    },
    /**
     * [getMonthStatis 取得每月数据。]
     */
    //取得每月数据。
    getMonthStatis (){
      this.$vux.loading.show({ text: 'Loading' })
      this.$http.get(config.urls.reports.getMonthsNotimes).then((res)=>{
        let data = res.data.data;
        let mylists = data.lists;
        // console.log(this.chartOption.xAxis.data)
        //
        this.chartOption.xAxis.data = data.months;
        console.log(this.chartOption.xAxis.data)
        let dataList_p = [];
        let dataList_o = [];
        mylists.forEach(function(item,index,arr){
          dataList_p.push(item.p);
          dataList_o.push(item.o);
        })
        this.chartOption.series[0].data = dataList_p;
        this.chartOption.series[1].data = dataList_o;
        this.drawChart('chart'); //画图
        this.$vux.loading.hide();
      }).catch(error => {
        this.$vux.loading.hide();
      })
    }


  },

  created () {

  },
  mounted (){
    this.getStatis();

    this.getMonthStatis();

  },
  activated (){
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

</style>
