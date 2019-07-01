<template>
  <div class="filter-box">
    <div class="title">{{$t('message.filter')}}</div>
    <div class="content" ref="filterContent" @scroll="onScroll">
      <div class="content-inner">
        <group :title="$t('message.reports.filter.dateRange')" class="filter-time">
          <datetime
            v-model="data_start"
            :title="$t('message.reports.filter.start_time')"
            :cancel-text="$t('message.cancel')"
            :confirm-text="$t('message.ok')"
            start-date="2017-01-01"
            format="YYYY-MM"
          ></datetime>
          <datetime
            v-model="data_end"
            :title="$t('message.reports.filter.end_time')"
            :cancel-text="$t('message.cancel')"
            :confirm-text="$t('message.ok')"
            start-date="2017-01-01"
            format="YYYY-MM"
          ></datetime>
        </group>

        <checklist
          class="filter-showType"
          :title="$t('message.reports.filter.displayData')"
          :options="selects_showType"
          v-model="data.show_type"
          :required = "true"
          :min="1"
          :max="max_showType"
          @on-change="changeShowType"
          label-position="left"
          v-if="!is_reShowType"

        ></checklist>
        <div class="filter-departmemt-wrapper">
          <checklist
            class="filter-department"
            :title="$t('message.reports.filter.branchFactory')+' ('+$t('message.reports.filter.selectLimitNum',{num:max_department})+')'"
            :options="selects_department"
            v-model="data_department"
            :required = "true"
            :min="1"
            :max="max_department"
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
import departmentApi from "@/api/department";
import myCache from "@/utils/myCache";
import cFuns from "@/utils/cFuns";

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
          show_type: [1],
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
      data_start:null,
      data_end:null,
      isLoading: false,
      scrollTop: 0,
      is_showFilter: false,
      is_refresh: false,
      is_reShowType: false,
      selects_showType: [
        { key: 1, value: this.$t("message.reports.showType.拼车行程数")},
        { key: 2, value: this.$t("message.reports.showType.参与司机数")},
        { key: 3, value: this.$t("message.reports.showType.参与乘客数")},
        { key: 4, value: this.$t("message.reports.showType.参与人数")}
      ],
      selects_department: [{ key: 0, value:'<b style="color:'+cFuns.strToColor('_Total_')+';margin-right:2px;" class="fa fa-circle"></b>'+this.$t("message.reports.filter.total") }],
      max_showType:1,
      max_department:3,
    };
  },
  watch: {
    'data.show_type':function(nVal,oVal){
      if(nVal.length < 1){
        this.data.show_type = typeof(oVal) != 'undefined' ? oVal : [1];
        this.is_reShowType = true;
        setTimeout(()=>{
          this.is_reShowType = false;
        },2)
      }
    },
    isShow(val) {
      this.is_showFilter = val;
      this.data = JSON.parse(JSON.stringify(this.filterData));
      this.data_department = this.data.department;
      this.data_start = this.data.date_start;
      this.data_end = this.data.date_end;
      console.log(this.filterData);
    }
  },
  methods: {
    onScroll(e) {
      // this.scrollTop = e.target.scrollTop;
    },
    changeShowType(data) {
        // console.log(data);
        if(data.length < 1){
          // this.filterData.show_type = [1];
          // this.$vux.toast.text(this.$t("至少选择一个"));
        }

        
    },
    changeDepartment(data) {
      let max = this.max_department;
      if (data.length > max || data.length < 1) {
        this.scrollTop = this.$refs.filterContent.scrollTop;
        if(data.length > max){
          this.$vux.toast.text(this.$t("不能选择大于"+max+"个"));
          this.data_department.splice(data.length - 1, 1);
        }
        if(data.length < 1){
          this.data_department = [0];
          // this.$vux.toast.text(this.$t("至少选择一个"));
        }
        this.is_refresh = true;
        setTimeout(() => {
          this.is_refresh = false;
        }, 2);

        setTimeout(() => {
          this.$refs.filterContent.scrollTop = this.scrollTop;
        }, 3);
      }
      console.log(this.data_department);
    },

    getDepartmentList() {
      this.isLoading = true;
      departmentApi.getListByDeep({ deep: 3 },{cacheKey:"carpool:departmet:selects:deep3",exp:3600})
        .then(res => {
          this.isLoading = false;
          let list = res;
          let newList = list.map(element => {
            return { key: element.id, value: '<b style="color:'+cFuns.strToColor(element.fullname)+';margin-right:2px;" class="fa fa-circle"></b>' + element.name, inlineDesc:element.fullname.replace(/\,/g,' / ') };
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
      this.data.date_start = this.data_start;
      this.data.date_end = this.data_end;
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
  .filter-departmemt-wrapper { min-height: 800px; }
}
</style>