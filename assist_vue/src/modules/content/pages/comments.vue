<template>
  <el-container class="P-comments-list not-el">
    <el-main>
      <div class="detail-box" >
        <template v-if="detailData" >
          <h1 class="title">{{detailData.title}}</h1>
          <div class="time-bar">
            <span class="name">{{detailData.name}}</span>
            <span class="date">{{detailData.post_time}} <span class="num">楼主</span></span>
          </div>
          <p class="desc">{{detailData.desc}}</p>
          <qrcode :value="url" type="img" style=" text-align:center" :size="128" fg-color="rgb(21, 53, 68)"></qrcode>
        </template>
      </div>
      <div class="comment-list">
          <comments-item
            v-for="(item,index) in listData"
            :key="item.id"
            :name="item.name"
            :time="item.post_time"
            :loginname="item.loginname"
            :content="item.content"
            :num="item.num"
            :is_delete="item.is_delete"
          >
        </comments-item >
        <list-load-more
        :show_noData="is_noData"
        :show_loadMore="is_show_loadMore"
        :show_loading="is_loading"
        :noDataText = "noDataText"
        loadMoreText = "加载更多评论"
        @load-more = "getComments()"
        ></list-load-more>

      </div>
    </el-main>
  </el-container>


</template>

<script>
import config from '@/configs'
import ViewBox from '@/components/CpViewBox'
import ListLoadMore from '../components/ListLoadMore'
import CommentsItem from '../components/CommentsItem'
import { Container,Main} from 'element-ui';
import {Qrcode  } from 'vux'

export default {
  components: {
    CommentsItem,ListLoadMore,
    Qrcode,
    ElContainer:Container,
    ElMain:Main,

  },

  data () {
    return {
      oid:0,
      type:0,
      listData:null,
      detailData:null,
      page:0,
      url:"",
      is_loading: false,
      is_noData: false,
      is_show_loadMore:false,
    }
  },
  computed : {
    noDataText (){
      return this.page>1 ? "无更多评论" : "暂无评论";
    }

  },
  methods :{
    init (){
      this.listData=null,
      this.detailData=null,
      this.page=0,
      this.oid = this.$route.params.oid || 0;
      this.type = this.$route.params.type || 0;
      this.url = location.href;
      this.getDetail();
      this.getComments();
    },

    getDetail(){
      this.$http.get(config.urls.public_idle+'/'+this.oid).then(res=>{
        if(res.data.code === 0){
          this.detailData = res.data.data;
          this.detailData.post_time = moment(this.detailData.post_time).format('YYYY-MM-DD HH:mm')
        }else{
          this.$toast.center('加载失败，请稍候再试');
        }

      }).catch(error=>{
        this.$toast.center('加载失败，请稍候再试');

      })
    },

    getComments (){
      var params = {
        type:this.type,
        oid:this.oid,
        is_delete:-1,
        page:this.page+1,
        pagesize:200,
      }
      this.is_loading = true;
      this.is_noData = false ;
      this.is_show_loadMore = false;
      this.$http.get(config.urls.public_comments,{params}).then(res=>{
        this.is_loading = false;
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
          this.listData.forEach((value,index,arr)=>{
            value.num = index+1
          })

        }else if(res.data.code == 20002){
          this.is_noData = true ;
        }else{
          setTimeout(()=>{
              this.is_show_loadMore = true;
          },5000)
          this.$toast.center('加载失败，请稍候再试');
        }

      }).catch(error=>{
        console.log(error)
        this.is_loading = false;
        setTimeout(()=>{
            this.is_show_loadMore = true;
        },5000)
        this.$toast.center('加载失败，请稍候再试');

      })
    }


  },

  created () {

  },
  activated (){
    this.init()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

</style>
