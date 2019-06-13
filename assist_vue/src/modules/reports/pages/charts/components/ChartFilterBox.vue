<template>
  <div class="filter-box">
    <div class="title">筛选 filter</div>
    <div class="content" ref="filterContent" @scroll="onScroll">
      <div class="content-inner">
        <group title="时间段" class="filter-time">
          <datetime
            v-model="data.date_start"
            :title="$t('message.reports.filter.start_time')"
            :cancel-text="$t('message.cancel')"
            :confirm-text="$t('message.ok')"
            start-date="2017-01-01"
            format="YYYY-MM"
          ></datetime>
          <datetime
            v-model="data.date_end"
            :title="$t('message.reports.filter.end_time')"
            :cancel-text="$t('message.cancel')"
            :confirm-text="$t('message.ok')"
            start-date="2017-01-01"
            format="YYYY-MM"
          ></datetime>
        </group>

        <checklist
          class="filter-showData"
          title="显示数据"
          :options="selects_showData"
          v-model="data.showData"
          :min="1"
          @on-change="changeShowData"
          label-position="left"
        ></checklist>
        <div class="filter-departmemt-wrapper">
          <checklist
            class="filter-department"
            title="选择分厂 (最多选5个)"
            :options="selects_department"
            v-model="data_department"
            :min="1"
            @on-change="changeDepartment"
            label-position="left"
            v-if="!is_refresh"
          ></checklist>
        </div>

        <p style="text-align:center; padding:8px;">
          <inline-loading v-show="isLoading"></inline-loading>
        </p>
      </div>
    </div>
    <div class="btn-bar">
      <div class="btn-group">
        <a class="btn btn-default" @click="cancel">{{$t('message.cancel')}}</a>
        <a class="btn btn-primary" @click="onConfirm">{{$t('message.ok')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime, Group, Checklist, InlineLoading } from "vux";
import departmentApi from "@/api/department.js";
import myCache from "@/utils/myCache.js";

export default {
  components: {
    Datetime,
    Group,
    Checklist,
    InlineLoading
  },
  props: {
    filterData: {
      default() {
        return {
          imeRange: "years",
          date_start: null,
          date_end: null,
          showData: [1],
          department: [0]
        };
      }
    },
    isShow: {
      default: false
    }
  },
  data() {
    return {
      data: {},
      data_department: [0],
      isLoading: false,
      scrollTop: 0,
      is_showFilter: false,
      is_refresh: false,
      selects_showData: [
        { key: 1, value: this.$t("拼车总人次") },
        { key: 2, value: this.$t("司机数") },
        { key: 3, value: this.$t("乘客数") }
      ],
      selects_department: [{ key: 0, value: this.$t("合计") }]
    };
  },
  watch: {
    // filterData: {
    //   handler(val) {
    //     console.log(val);
    //     this.data = val;
    //   },
    //   deep: true
    // },
    isShow(val) {
      this.is_showFilter = val;
      this.data = JSON.parse(JSON.stringify(this.filterData));
      this.data_department = this.data.department;
      console.log(this.filterData);
    }
  },
  methods: {
    onScroll(e) {
      // this.scrollTop = e.target.scrollTop;
    },
    changeShowData(data) {
      console.log(data);
    },
    changeDepartment(data) {
      if (data.length > 5) {
        this.$vux.toast.text(this.$t("不能选择大于5个"));
        this.scrollTop = this.$refs.filterContent.scrollTop;
        this.data_department.splice(data.length - 1, 1);
        this.is_refresh = true;
        setTimeout(() => {
          this.is_refresh = false;
        }, 3);

        setTimeout(() => {
          this.$refs.filterContent.scrollTop = this.scrollTop;
        }, 5);
      }
      console.log(this.data_department);
    },

    getDepartmentList() {
      this.isLoading = true;
      myCache
        .do(
          "carpool:departmet:selects:deep3",
          [departmentApi.getListByDeep, { deep: 3 }],
          3600
        )
        .then(res => {
          this.isLoading = false;
          let list = res;
          let newList = list.map(element => {
            return { key: element.id, value: element.name };
          });
          this.selects_department = this.selects_department.concat(newList);
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    cancel() {
      this.$emit("on-cancel");
    },
    onConfirm() {
      this.data.department = this.data_department;
      this.$emit("on-confirm", this.data);
    },

    log() {}
  },
  created() {
    console.log("created");
    // this.data = this.filterData;
    this.getDepartmentList();
  },
  activated() {
    console.log("activated");
  }
};
</script>

<style lang="scss"  scoped>
.filter-box {
  $btnBar-height: 50px;
  $title-height: 28px;
  height: 100%;
  position: relative;
  .title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $title-height;
    padding: 4px 8px;
    font-size: 14px;
    background: #eee;
    border-bottom: 1px solid #ddd;
    color: #888;
    z-index: 100;
  }
  .content {
    height: 100%;
    overflow-y: scroll;
    background: #fafafa;
  }
  .content-inner {
    padding: ($title-height + 12px) 0 ($btnBar-height + 12px);
  }
  .btn-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $btnBar-height;
    padding: 8px 12px;
    text-align: right;
    background: #fff;
    border-top: 1px solid #eee;
  }
  .filter-departmemt-wrapper { min-height: 800px;}
}
</style>