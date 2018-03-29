<template>
   <cp-view-box id="Page-today" :position="{bottom:'44px'}"    :enableInfinite="false" :enableRefresh="false"   >
        <div class="page-view-content">
          <h1 class="cp-title" > 今日拼车</h1>
              <table class="table table-bordered table-striped">
                <thead class="cp-thead">
                  <tr>
                    <th>司机</th>
                    <th>厂部</th>
                    <th>乘客</th>
                    <th>厂部</th>
                    <th>时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="(item,index) in listData"
                    :key="item.infoid">
                    <td>{{item.name_o}}</td>
                    <td>{{item.companyname_o}}</td>
                    <td>{{item.name_p}}</td>
                    <td>{{item.companyname_p}}</td>
                    <td>{{item.time}}</td>
                  </tr>
                </tbody>
              </table>
        </div>
        <cp-foot-nav-bar current="today"></cp-foot-nav-bar>
   </cp-view-box>
</template>

<script>
import config from '../../../configs'
import CpViewBox from '../../../components/CpViewBox'
import CpFootNavBar from '../components/CpFootNavBar'


export default {
  components: {
      CpFootNavBar,CpViewBox
  },
  data () {
    return {
      listData: [],
    }
  },
  computed : {

  },
  watch :{

  },
  methods :{
    /**
     * 取得列表
     */
    getList(){
      this.$vux.loading.show({ text: 'Loading' })
      this.$http.get(config.urls.reports.getTodayInfo).then((res)=>{
        if(res.data.code===0){
          let data = res.data.data
          this.listData = data.lists;
          this.$vux.loading.hide();

        }
        // console.log()
      }).catch(error => {
        this.$vux.loading.hide();
      })
    },

  },

  created () {

  },
  mounted () {
    this.getList();

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">


</style>
