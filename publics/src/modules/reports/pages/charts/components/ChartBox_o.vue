<template>
  <div id="chart" class="cp-chart-content"></div>
</template>

<script>

import config from "@/configs";

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";

export default {
  data (){
    return {
      //构设图表的设置。
      chartOption: {
        title: {
          text: this.$t("message.reports.CarpoolingStatistics"),
          padding: [8, 4, 4, 8],
          textStyle: { color: "#74697e" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#692290"
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
            type: "inside",
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        legend: {
          top: 8,
          right: 10
        },
        grid: {
          top: "44px",
          left: "3%",
          right: "8%",
          bottom: "50px",
          containLabel: true
        },

        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ["2018", "2017"]
        },
        yAxis: { type: "value" },
        series: [
          {
            type: "line",
            name: this.$t("message.reports.totalDrivers"),
            label: {
              normal: { show: true, position: "top", color: "#226728" }
            },
            areaStyle: { normal: {} },
            itemStyle: { color: "#65b6af" },
            smooth: true,
            data: [0, 0]
          },
          {
            type: "line",
            name: this.$t("message.reports.totalPassengers"),
            label: {
              normal: { show: true, position: "top", color: "#794a32" }
            },
            areaStyle: { normal: {} },
            itemStyle: { color: "#ec7751" },
            smooth: true,
            data: [0, 0]
          }
        ]
      }
    }
  },
  methods: {
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
      this.$vux.loading.show({ text: "Loading" });
      this.$http
        .get(config.urls.reports.getMonthsNotimes)
        .then(res => {
          let data = res.data.data;
          let mylists = data.lists;
          // console.log(this.chartOption.xAxis.data)
          //
          this.chartOption.xAxis.data = data.months;
          let dataList_p = [];
          let dataList_o = [];
          mylists.forEach(function(item, index, arr) {
            dataList_p.push(item.p);
            dataList_o.push(item.o);
          });
          this.chartOption.series[0].data = dataList_p;
          this.chartOption.series[1].data = dataList_o;
          this.drawChart("chart"); //画图
          this.$vux.loading.hide();
        })
        .catch(error => {
          this.$vux.loading.hide();
        });
    },
  },
  mounted() {

    this.getMonthStatis();
  },

}

</script>
