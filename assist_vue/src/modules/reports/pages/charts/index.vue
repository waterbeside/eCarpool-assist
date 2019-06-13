<template>
  <drawer-layout drawer-position="right" :drawable-width="100" :enable="true" @slide-end="drawerChange" @mask-click="hideFilterBox" ref='drawerBox'>
    <div class="drawer-content" slot="drawer">
      <chart-filter-box 
      @on-cancel="hideFilterBox" @on-confirm="confirmFilterBox" 
      :is-show="is_showFilter" :filter-data="filterData"
      >
      </chart-filter-box>
    </div>
    <view-box ref="viewBox" id="Page-charts" slot="content">
      <div class="page-view-content">
        <div class="row cp-statis-wrapper">
          <div class="cp-statis-item col-xs-6">
            <statis-item :num="statis.people" icon="fa fa-male" :duration="1">
              <div slot="title" class="title">{{$t("message.reports.totalTrips")}}</div>
            </statis-item>
          </div>
          <div class="cp-statis-item col-xs-6">
            <statis-item :num="statis.carbon" icon="fa fa-leaf" :duration="1">
              <div slot="title" class="title">{{$t("message.reports.ReduceCarbonEmissions")}}(KG)</div>
            </statis-item>
          </div>
        </div>
        <div class="btn-filter-bar" @click="showFilterBox">
          <div class="title">图表：</div>
          <label>筛选 <i class="fa fa-angle-right"></i></label>
          </div>
        <chart-box ref="chartBox"></chart-box>
        <!-- <div id="chart" class="cp-chart-content"></div> -->
      </div>
      <cp-foot-nav-bar current="charts"></cp-foot-nav-bar>
    </view-box>
  </drawer-layout>
</template>

<script>
import config from "@/configs";
import StatisItem from "@/components/StatisItem";
import DrawerLayout from "@/components/DrawerLayout";
import CpFootNavBar from "../../components/CpFootNavBar";
import ChartFilterBox from "./components/ChartFilterBox";
import ChartBox from "./components/ChartBox";


export default {
  components: {
    CpFootNavBar,
    StatisItem,
    DrawerLayout,
    ChartFilterBox,
    ChartBox
  },

  data() {
    return {
      statis: {
        people: 0,
        distance: 0,
        carbon: 0
      },
      is_showFilter: 0,
      filterData:{
        imeRange: "years",
        date_start: null,
        date_end: null,
        showData: [1,2,3],
        department: [0]
      },

      
    };
  },
  computed: {},
  methods: {
   
    /**
     * [getStatis 取得总行程数目数据。]
     */
    getStatis() {
      this.$http
        .get(config.urls.reports.reputationSummary)
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            let data = res.data.data;
            this.statis.people = parseFloat(data.sumtrip);
            // this.statis.carbon = data.sumtrip *7.6*2.3/10 ;
            this.statis.carbon = data.sumtrip * 7 * 0.0627;
          }
        })
        .catch(error => {});
    },
    /**
     * 显示筛选抽屉
     */
    showFilterBox(){
      this.$refs.drawerBox.toggle(1);
    },
    /**
     * 隐藏筛选抽屉
     */
    hideFilterBox (){
      this.$refs.drawerBox.toggle(0);
    },
    /**
     * 确认抽屉
     */
    confirmFilterBox(data){
      this.filterData = Object.assign({},data);
      this.hideFilterBox();
    },
    /**
     * 关闭或打开Drawer时
     */
    drawerChange (vis){
      this.is_showFilter = vis;
    }
  },

  created() {},
  mounted() {
    this.getStatis();

  },
  activated() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.drawer-content {
  background: rgba(255, 255, 255, 0.9);
  height: 100%;
}
.btn-filter-bar{
  display: flex;
  justify-content:space-between;
  padding: 4px 12px 2px;
  line-height: 22px;
  background:#f0f0f0;
  label {
    color: #888; 
    font-weight: 400;
    i { margin-left: 4px; font-size: 22px; float:right; color:#bbb}
  }
}
</style>
