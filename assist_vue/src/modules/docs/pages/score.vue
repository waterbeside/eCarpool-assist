<template>
  <view-box ref="viewBox" class="cp-viewBox">
        <div class="page-view-content">
          <div  class="container" >

            <article class="cp-article">
              <h1>积分到账</h1>
              <p>1.合法的拼车产生的积分会在第二天发放</p>
              <p>2.拼车无效或评定为不合法拼车, 积分会推迟1-3天发放,</p>
              <p>3.若当月用户被系统多判定次行程不合法后, 当月的其他拼车将不再产生积分</p>
              <h1>积分兑换说明</h1>
              <p><b>一、时间</b></p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; 1、下单时间：每月的3、4、5日，用户可以选择需要兑换的奖品进行下单预约；</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp;  2、兑换时间：每月的18、19、20日，用户可至GEK 工业工程部进行奖品兑换。</p>
              <p><b>二、说明</b></p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp;  1、积分兑换每月进行一次，未进行下单的积分将会<b style="color:rgb(200, 64, 28)">自动累积到下一个月</b>；</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; 2、用户在下单时间内，可在“兑换历史”进行取消订单操作，超过下单时间的订单将无法取消；</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; 3、兑换奖品时，建议同部门的人一起兑奖，可将大家的下单“订单号”邮件发至AiN@esquel.com，以便可以提前准备好奖品，减少等待时间；</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; 4、拼车使用过程中请始终保持GPS活跃，勿直接关闭或者杀死APP进程，所产生的有效积分将会在隔天生效且自动发放到您的账户中。</p>
              <p><br></p>
              <p >&nbsp; &nbsp; &nbsp; &nbsp;  感谢大家对“溢起拼车”的支持~</p>
              <p @click='showTest'>&nbsp; &nbsp; &nbsp; &nbsp; 低碳环保，绿色出行！</p>
              <p v-show="isShowTest" style="font-size:10px;color:#ccc">{{jwt}},{{lag}},{{ios_version}}</p>

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
      isShowTest:false,
      ios_version:'',

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
    this.lag = localStorage.getItem('language');
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
  color:rgb(86, 116, 129);
}
@media (min-width: 768px){


}
</style>
