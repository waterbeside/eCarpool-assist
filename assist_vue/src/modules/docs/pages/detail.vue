<template>
  <view-box ref="viewBox" >

        <div class="page-view-content">
          <div  class="container" v-if="id">
            <article class="cp-article" v-html="content"></article>
          </div>
        </div>
   </view-box>

</template>

<script>
import config from '../../../configs'

export default {
  components: {


  },

  data () {
    return {
      id:0,
      title:'',
      content:'加载中。。。'

    }
  },
  computed : {


  },
  methods :{
    init (){
      this.id = this.$route.params.id ? this.$route.params.id : 0;
      console.log(this.id);
      this.getData();
    },
    getData (){
      this.$http.get(config.urls.docs+"/"+this.id).then(res=>{
        console.log(res)
        if(res.data.code === 0){
          let data = res.data.data
          this.title = data.title
          this.content = data.content
        }
      }).catch(error=>{
        this.$vux.toast.text('网络好像不太畅通');
      })
    }



  },

  created () {

  },
  activated (){
    this.content = '加载中。。。'
    this.title = ''
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
@media (min-width: 768px){


}
</style>
