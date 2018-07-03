<template>
  <view-box ref="viewBox" >

        <div class="page-view-content">
          <ul class="list-group">
            <li class="list-group-item"><a href="aboutus.html#/qcode">关于我们</a></li>
            <li class="list-group-item"><a href="docs.html">文档</a></li>
            <li class="list-group-item"><a href="invitation.html">站外邀请</a></li>
            <li class="list-group-item"><a href="reports.html">报表</a></li>
          </ul>

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
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: '/component/cell'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
        url: {
          path: '/component/radio',
          replace: false
        },
        meta: {
          source: '来源信息',
          date: '时间',
          other: '其他信息'
        }
      }],


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
<style  lang="less">

</style>
