<template>
  <view-box ref="viewBox" class="cp-viewBox">
        <div class="page-view-content">
          <div  class="container" >
            <article class="cp-article">
              <h1>幸运抽奖说明</h1>
              <p>1，幸运大转盘，每次消耗一定的积分（目前暂定为2积分/次）进行抽奖，可随机抽取到奖池中的奖项。所抽中奖项如果是积分，则直接增加到账户中，即时到账可随时查询。如果是实物则需要在开奖后的15日后到GEK工业工程部进行领取，介时我们也会联系通知您。</p>
              <p>2，幸运抽奖，幸运抽奖是使用奖池累积的方式进行抽奖，当满足抽奖物品所设定的人次后会马上开奖，从所有购买的订单当中随机抽取一个作为中奖号码并获得此奖品，开奖后请于15日后到GEK工业工程部进行领取，介时我们也会联系通知您。开奖后将会自动滚入新的一期抽奖，用户可继续参与抽奖。</p>
              <p>3，幸运抽奖是有“溢起拼车”推出的一个回报大家与鼓励大家踊跃使用“溢起拼车”的活动，本活动所有解释权归“溢起拼车”所有。</p>
              <p>4，感谢大家对“溢起拼车”以及“溢起拼车”所有幕后人员的支持，如有任何问题可联系“AiN@esquel.com”。溢路上有你，挤一点也愿意！</p>
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




  },

  created () {

  },
  activated (){


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
