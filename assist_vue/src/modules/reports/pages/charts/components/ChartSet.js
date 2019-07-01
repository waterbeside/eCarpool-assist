import i18n from '@/utils/i18n'

const ChartSet =  {
  chartOption : {
    title: {
      text: i18n.t("message.reports.CarpoolingStatistics"),
      padding: [8, 4, 4, 8],
      textStyle: { color: "#74697e" ,fontSize:'20'},
      // x: 'center',
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
    // dataZoom: [
    //   {
    //     show: true,
    //     realtime: true,
    //     start: 0,
    //     end: 100
    //   },
    //   {
    //     type: "inside",
    //     realtime: true,
    //     start: 0,
    //     end: 100
    //   }
    // ],
    legend: {
      top: 40,
      right: 10
    },
    grid: {
      top: "68px",
      left: "3%",
      right: "8%",
      bottom: "12px",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["2018", "2017"]
    },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        name: i18n.t("message.reports.totalDrivers"),
        label: {
          normal: { show: true, position: "top", color: "#226728" }
        },
        areaStyle: { normal: {} },
        itemStyle: { color: "#65b6af" },
        smooth: true,
        data: [0, 0]
      },
    ]
  },
  serieItemDefault: {
    type: "line",
    name: i18n.t("message.reports.sum"),
    label: {
      normal: { show: true, position: "top", color: "#794a32" }
    },
    areaStyle: {type: 'default'},
    itemStyle: { color: "#ec7751" },
    smooth: true,
    data: []
  }
}
export default ChartSet;