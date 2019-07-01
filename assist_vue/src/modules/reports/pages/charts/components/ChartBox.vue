<template>
  <div id="chart" class="cp-chart-content"></div>
</template>

<script>
import config from "@/configs";
import reportsApi from "@/api/reports";
import ChartSet from "./ChartSet";
import departmentApi from "@/api/department";
import cFuns from "@/utils/cFuns";
import { md5 } from 'vux'

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";

export default {
  props: {
    filterData: {
      default() {
        return {
          // imeRange: "years",
          date_start: null,
          date_end: null,
          show_type: [1],
          department: [0]
        };
      }
    }
  },
  data() {
    return {
      //构设图表的设置。
      chartOption: ChartSet.chartOption
    };
  },
  watch: {},
  methods: {
    init() {
      this.getMonthStatis();
      let titles = {
        's1': this.$t("message.reports.showType.拼车行程数"),
        's2': this.$t("message.reports.showType.参与司机数"),
        's3': this.$t("message.reports.showType.参与乘客数"),
        's4': this.$t("message.reports.showType.参与人数"),
      }
      if(this.filterData.show_type.length === 1){
        let showType = this.filterData.show_type[0];
        if(typeof(titles['s'+this.filterData.show_type[0]])!="undefined"){
          this.chartOption.title.text = titles['s'+this.filterData.show_type[0]];
        }
      }
      
      
    },
    /**
     * 绘制图表
     * @param  {string} id 绘制目标的容器ID
     */
    drawChart(id) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById(id));
      // 绘制图表
      myChart.setOption(this.chartOption);
    },
   
    /**
     * [getMonthStatis 取得每月数据。]
     */
    //取得每月数据。
    getMonthStatis() {
      console.log("this.filterData");
      console.log(this.filterData);
      let param = {
        show_type: this.filterData.show_type.join(","),
        department: this.filterData.department.join(","),
        start: this.filterData.date_start,
        end: this.filterData.date_end
      };
      console.log(param);
      this.$vux.loading.show({ text: "Loading" });
      reportsApi
        .getMonthStatic(param)
        .then( async (res) => {
          if(res.code === 0){
            let data = res.data;
            let s_list = data.list;
            
            //创建x轴系列
            let series = [];
            let months = [];
            for(let month in s_list){
              months.push(month);
              let lists = s_list[month];
              let series_i = 0;
              for(let department_id in lists){
                let value = lists[department_id];
                if(department_id !="month"){
                  if(typeof(series[series_i])=="undefined"){
                    series[series_i] = Object.assign({},ChartSet.serieItemDefault);
                    series[series_i].data = [];
                    if(department_id > 0){
                      let departmentData =  await departmentApi.getDeep3ItemData(department_id);
                      series[series_i].name =  departmentData.name ;
                      series[series_i].itemStyle = {color:cFuns.strToColor(departmentData.fullname)};
                    }else{
                      series[series_i].name =  this.$t("message.reports.filter.total");
                      series[series_i].itemStyle = {color:cFuns.strToColor('_Total_')};
                    }
                    
                  }
                  series[series_i].data.push(value);
                  series_i ++ ;
                }  
              }
            }
            this.chartOption.xAxis.data = months;
            this.chartOption.series = series;
            console.log(series);
            this.drawChart("chart");
          }
          this.$vux.loading.hide();
        })
        .catch(error => {
          console.log(error)
          this.$vux.loading.hide();
        });
      // this.$http
      //   .get(config.urls.reports.getMonthsNotimes)
      //   .then(res => {
      //     let data = res.data.data;
      //     let mylists = data.lists;
      //     // console.log(this.chartOption.xAxis.data)
      //     //
      //     this.chartOption.xAxis.data = data.months;
      //     let dataList_p = [];
      //     let dataList_o = [];
      //     mylists.forEach(function(item, index, arr) {
      //       dataList_p.push(item.p);
      //       dataList_o.push(item.o);
      //     });
      //     this.chartOption.series[0].data = dataList_p;
      //     this.chartOption.series[1].data = dataList_o;
      //     this.drawChart("chart"); //画图
      //     this.$vux.loading.hide();
      //   })
      //   .catch(error => {
      //     this.$vux.loading.hide();
      //   });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
