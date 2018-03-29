<template lang="html">
    <div class="cp-view-box"  :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" :style="style"    @scroll="scroll($event)">
        <slot ></slot>

    </div>
</template>

<script>
    export default {
        props: {
            position:{
              type:Object,
              default: ()=>{
                return {top:0,left:0,right:0,bottom:0}
              }
            },


        },
        computed :{
          style (){
            let styleStr = ""
            styleStr +=  this.position.top ? "top:"+this.position.top+";" : "";
            styleStr +=  this.position.right  ? "right:"+this.position.right+";" : "";
            styleStr +=  this.position.bottom ? "bottom:"+this.position.bottom+";" : "";
            styleStr +=  this.position.left  ? "left:"+this.position.left+";" : "";

            return styleStr;
          }
        },
        data() {
            return {
                top: 0,
                state: 0,
                startX: 0,
                startY: 0,
                touching: false,
                infiniteLoading: false,
                downFlag: false, //用来显示是否加载中
            }
        },
        methods: {

            scroll (e){
              this.$emit('on-scroll',e);
            }

        },
        mounted () {

        },
        created () {

        },
        activated (){
        }
    }
</script>
<style lang="less">
.cp-view-box {
  height:100%; overflow-y: scroll;
}
</style>
