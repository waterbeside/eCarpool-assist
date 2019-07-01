<template>
  <drawer-layout
    drawer-position="right"
    :drawable-width="100"
    :enable="true"
    @slide-end="drawerChange"
    @mask-click="hideFilterBox"
    ref="drawerBox"
  >
    <div class="drawer-content" slot="drawer">
      <chart-filter-box
        @on-cancel="hideFilterBox"
        @on-confirm="confirmFilterBox"
        :is-show="is_showFilter"
        :filter-data="filterData"
      ></chart-filter-box>
    </div>
    <view-box ref="viewBox" id="Page-charts" slot="content">
      <div class="page-view-content">
        <div class="row cp-statis-wrapper">
          <div class="cp-statis-item col-xs-6">
            <statis-item :num="statis.trip_pt" icon="fa fa-male" :duration="1">
              <div slot="title" class="title">{{$t("message.reports.CarpoolPersonTime")}}</div>
            </statis-item>
          </div>
          <div class="cp-statis-item col-xs-6">
            <statis-item :num="statis.carbon" icon="fa fa-leaf" :duration="1">
              <div slot="title" class="title">{{$t("message.reports.ReduceCarbonEmissions")}}(KG)</div>
            </statis-item>
          </div>
        </div>
        <div class="btn-filter-bar" @click="showFilterBox">
          <div class="title"><i class="fa fa-line-chart"></i> {{filterData.date_start}} ~ {{filterData.date_end}}</div>
          <label>
            {{$t('message.filter')}}
            <i class="fa fa-angle-right"></i>
          </label>
        </div>
        <chart-box ref="chartBox" :filter-data="filterData" v-if="showChart"></chart-box>
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
import cFuns from "@/utils/cFuns";

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
        trip_pt: 0,
        distance: 0,
        carbon: 0
      },
      showChart: false,
      is_showFilter: 0,
      filterData: {
        date_start: cFuns.formatDate(new Date(),'yyyy-mm'),
        date_end: cFuns.formatDate(new Date(),'yyyy-mm'),
        show_type: [1],
        department: [0]
      }
    };
  },
  computed: {},
  methods: {
    init(){
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let s_month = month == 12 ? 1 : cFuns.fixZero(month + 1 ) ;
      let s_year  = month == 12 ? year : year - 1;
      this.filterData.date_start = s_year+ '-'+ s_month;
      this.showChart = true;
      this.getStatis();
    },
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
            this.statis.trip_pt = parseFloat(data.sumtrip) * 2;
            // this.statis.carbon = data.sumtrip *7.6*2.3/10 ;
            this.statis.carbon = data.sumtrip * 7 * 0.0627;
          }
        })
        .catch(error => {});
    },
    /**
     * 显示筛选抽屉
     */
    showFilterBox() {
      this.$refs.drawerBox.toggle(1);
    },
    /**
     * 隐藏筛选抽屉
     */
    hideFilterBox() {
      this.$refs.drawerBox.toggle(0);
    },
    /**
     * 确认抽屉
     */
    confirmFilterBox(data) {
      this.showChart = false;
      this.filterData = Object.assign({}, data);
      this.hideFilterBox();
      // this.$refs.chartBox.init();
      setTimeout(() => {
        this.showChart = true;
      }, 100);
    },
    /**
     * 关闭或打开Drawer时
     */
    drawerChange(vis) {
      this.is_showFilter = vis;
    }
  },

  created() {},
  mounted() {
    this.init();
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
.btn-filter-bar {
  display: flex;
  justify-content: space-between;
  padding: 4px 12px 2px;
  line-height: 22px;
  background: #f0f0f0;
  label {
    color: #888;
    font-weight: 400;
    i {
      margin-left: 4px;
      font-size: 22px;
      float: right;
      color: #bbb;
    }
  }
}
</style>
