<template>
  <view-box ref="viewBox" >

        <div class="page-view-content">
          <div class="page-view-content" >
            <ul class="list-group">
              <li class="list-group-item"><router-link to="/lottery">抽奖说明</router-link></li>
              <li class="list-group-item"><router-link to="/score">积分说明</router-link></li>
              <li class="list-group-item"><router-link to="/carpool_disclaimer">免责声明</router-link></li>
            </ul>
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

    }
  },
  computed : {


  },
  methods :{
    init (){


    }



  },

  created () {

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>

</style>
