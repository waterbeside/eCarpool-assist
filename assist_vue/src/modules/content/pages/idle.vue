<template>
  <el-container class="P-idle-list not-el">
    <el-main>
      <div class="idle-list">
          <idle-item
            v-for="(item,index) in listData"
            :key="item.id"
            :title="item.title"
            :name="item.name"
            :time="item.post_time"
            :loginname="item.loginname"
            :content="item.desc"
            :num="item.num"
            @click.native="goComments(item.id)"
          >
          </idle-item >

      </div>
      <list-load-more
      :show_noData="is_noData"
      :show_loadMore="is_show_loadMore"
      :show_loading="is_loading"
      :noDataText = "noDataText"
      @load-more = "getList()"
      ></list-load-more>

    </el-main>
  </el-container>


</template>

<script>
import config from '@/configs'
import IdleItem from '../components/IdleItem'
import ListLoadMore from '../components/ListLoadMore'
import { Container,Main} from 'element-ui';

export default {
  components: {
    IdleItem, ListLoadMore,
    ElContainer:Container,
    ElMain:Main,

  },

  data () {
    return {
      oid:0,
      type:0,
      listData:null,
      page:0,
      is_loading: false,
      is_noData: false,
      is_show_loadMore:false,
    }
  },
  computed : {
    noDataText (){
      return this.page>1 ? "无更多数据" : "暂无数据";
    }


  },
  methods :{
    init (){
      this.oid = this.$route.params.oid || 0;
      this.type = this.$route.params.type || 0;
      this.getList();
    },

    goComments (id){
      this.$router.push({ name:'comments', params: {type:100,oid: id} })
    },


    getList (){
      var params = {
        page:this.page+1,
        pagesize:24,
      }
      this.is_loading = true;
      this.is_noData = false ;
      this.is_show_loadMore = false;

      this.$http.get(config.urls.public_idle,{params}).then(res=>{
        if(res.data.code === 0){
          let data = res.data.data
          this.is_show_loadMore = true;
          if(data.lists.length === 0 || data.lists.length < params.pagesize){
            this.is_noData = true ;
            this.is_show_loadMore = false;
          }
          if(data.page.currentPage > 1 ){
            this.listData  = this.listData.concat(data.lists);
          }else{
            this.listData = data.lists;
          }
          this.page = data.page.currentPage;

        }else if(res.data.code == 20002){
          this.is_noData = true ;
        }else{
          this.is_show_loadMore = true;
          this.$toast.center('加载失败，请稍候再试');
        }
        this.is_loading = false;


      }).catch(error=>{
        this.is_loading = false;
        this.$toast.center('加载失败，请稍候再试');

      })
    }


  },

  created () {
    this.init()

  },
  activated (){
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

</style>
