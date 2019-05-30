<template>
  <view-box ref="viewBox" >

        <div class="page-view-content">
          <div  class="container" v-if="id">
            <article class="cp-article" v-html="content"></article>
          </div>
          <!-- <div class="test">
            <p> {{lang}} </p>
            <p> {{lang2}} </p>
          </div> -->
        </div>

   </view-box>

</template>

<script>
import config from '@/configs'
import cFuns from '@/utils/cFuns'

export default {
  components: {


  },

  data () {
    return {
      id:0,
      title:'',
      content:'<i class="fa fa-spinner fa-spin"></i>',
      lang : "-",
      lang2 : "-",
      paramLang:null,
    }
  },
  computed : {


  },
  methods :{
    init (){
      this.paramLang = this.$store.state.paramLang;
      var lang = this.paramLang ? this.paramLang :cFuns.getLanguage();
      this.lang = lang;
      this.content = '<div style="text-align:center; margin-top:30px; font-size:20px">\
      <i class="fa fa-spinner fa-spin"></i>\
      </div>'
      this.title = ''
      this.id = this.$route.params.id ? this.$route.params.id : 0;
      var cacheKey = "carpool.doc."+this.id+"."+lang;
      // var data =  sessionStorage ? sessionStorage.getItem(cacheKey) : false;
      // if(data){
      //   this.content = data;
      // }else{
        this.getData().then(res=>{
          if(sessionStorage) sessionStorage.setItem(cacheKey,this.content);
        });
      // }
    },
    getData (){
      var url = this.paramLang ? config.urls.docs+"/"+this.id+"?_language="+this.paramLang :  config.urls.docs+"/"+this.id;
      return new Promise((resolve,reject)=>{
        this.$http.get(url).then(res=>{
          if(res.data.code === 0){
            let data = res.data.data;
            this.title = data.title;
            document.title = this.title;
            this.content = data.content;
            resolve(res);
          }
        }).catch(error=>{
          this.$vux.toast.text(this.$t("message.networkFail"));
        })
      })

    }



  },

  created () {

  },
  activated (){
    // this.lang2 = localStorage ? localStorage.getItem('language') : "";
    this.init();


  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
h1 { font-size: 20px; text-align: center; margin-bottom: 20px;}
.cp-article {
  padding-top: 20px;
  font-size: 14px;
  color:rgb(86, 116, 129);
}
.test {color:#aaa}
@media (min-width: 768px){


}
</style>
