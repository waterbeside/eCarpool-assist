<template>
  <view-box ref="viewBox" >

        <div class="page-view-content">
          <group>
            <popup-radio title="请求方法" :options="types" v-model="type"></popup-radio>
         </group>
          <group>
            <x-input   class="form-control-line" :show-clear="true"   placeholder="测试地址"    v-model="apiUrl" ref="input"></x-input>
          </group>
          <group>
            <x-input   class="form-control-line" :show-clear="true"   placeholder="参数"    v-model="param" ref="param"></x-input>
          </group>
          <div class="container" style="margin-top:20px">
            <a href="javascript:void(0);" class="btn btn-primary btn-block" @click="test">test</a>
          </div>
        </div>
   </view-box>

</template>

<script>
import config from '../../../configs'
import {Group, XInput,PopupRadio} from 'vux'

export default {
  components: {
    XInput,Group,PopupRadio
  },

  data () {
    return {
      apiUrl:'',
      type:'get',
      types:[
        'get','post',
      ],
      param:'{"参数key":"value"}'
    }
  },
  computed : {

  },
  methods :{

    test(){
      let data = JSON.parse(this.param);
      this.$http({
          method: this.type,
          url: this.apiUrl,
          data: data
        }).then((res)=>{
          console.log(res);
        });
    }

  },

  created () {

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
p {margin-bottom: 0}
label {margin-bottom: 0}

</style>
