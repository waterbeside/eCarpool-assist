<template>
  <view-box ref="viewBox" class="cp-viewBox">
        <div class="page-view-content">
          <div  class="container" >

            <article class="cp-article">
              <p v-show="isShowTest" >jwt: <b>{{jwt}}</b></p>
              <p v-show="isShowTest" >lag: <b>{{lag}}</b></p>
              <p v-show="isShowTest">ios_version: <b>{{ios_version}}</b></p>
              <p v-show="isShowTest" >android_version: <b>{{android_version}}</b></p>
            </article>



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
      jwt : '',
      lag: '',
      isShowTest:true,
      ios_version:'',
      android_version:'',

    }
  },
  computed : {


  },
  methods :{
    showTest(){
      if(this.isShowTest){
        this.isShowTest = false;
      }else{
        this.isShowTest = true;
      }
    }
  },

  created () {

  },
  activated (){
    this.jwt = localStorage.getItem('CP_U_TOKEN');
    this.lag = localStorage.getItem('lag');
    this.ios_version = localStorage.getItem('ios_version');
    this.android_version = localStorage.getItem('android_version');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
h1 { font-size: 20px; text-align: center; margin-bottom: 20px;}
.cp-article {
  font-size: 14px;
  color:rgb(77, 91, 97);
}
@media (min-width: 768px){


}
</style>
