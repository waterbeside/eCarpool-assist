<template>
  <view-box ref="viewBox" class="cp-viewBox">
        <div class="page-view-content">
          <msg :title="$t('message.user.mergeSuccess')" description=""   icon=""  v-show="isSuccess" ></msg>
          <div class="alert alert-warning" v-show="!isSuccess">
              <p>
                <b>溢起拼车</b>： 您现正进行“合并账号”操作</b>，如果你的手机号之前被注册成capool账号，请使用员工账号及其密码和被注册的手机号进行合并操作。合并后手机账号原有的积分将合并到员工号账号。
              </p>
          </div>
          <form class="form form-login form-horizontal"　 method="post" onsubmit="return false" v-show="!isSuccess">

            <!-- step:0 -->
            <div class="form-inner"  >
              <div class="cp-form-group ">
                <label  class="control-label "  for="phone"><i class="fa fa-id-card"></i> </label>
                <input type="text" class="form-control form-control-line  " name="username" :placeholder="$t('message.user.employeeID')" v-model="formData.username" >
              </div>

              <div class="cp-form-group ">
                <label  class="control-label"  for="password"><i class="fa fa-lock"></i></label>
                <input type="password" class="form-control form-control-line    " name="password" :placeholder="$t('message.user.passwordOfEmployeeID')" v-model="password" >
              </div>

              <div class="cp-form-group ">
                <label  class="control-label "  for="phone"><i class="fa fa-phone"></i> </label>
                <input type="tel" class="form-control form-control-line " id="phone" name="phone" :placeholder="$t('message.user.phoneNumber')" v-model="formData.phone" autocomplete="false" >
                <button class="btn btn-default btn-sendsms "   :disabled="isCounting" @click.prevent="sendCode" id="btnSendCode">
                  <span v-show="!isCounting">{{$t('message.smsCode.getCode')}}</span>
                  <span  v-show="isCounting">{{$t('message.smsCode.reSend')}} ( <countdown v-model="countNum" :start="isCounting" @on-finish="finishCount"></countdown> )</span>
                </button>
              </div>
              <div class="cp-form-group">
                  <label  class="control-label "  for="code"><i class="fa fa-check-circle-o"></i> </label>
                  <input type="text" class="form-control form-control-line   " name="code" :placeholder="$t('message.smsCode.VerificationCode')" v-model="formData.code"  >
              </div>

              <div class="text-danger" id="callback-tips"></div>
              <p class="cp-submitbtn-wrapper">
                <button class="btn btn-primary btn-lg  btn-block J-btn-submit"  @click="doSubmit" :disabled="isLoading">{{$t('message.submit')}}</button>
              </p>
            </div>


          </form>




        </div>
   </view-box>
</template>

<script>
import config from '@/configs'
import { md5 } from 'vux'

export default {
  components: {


  },

  data () {
    return {
      formData: {
        username: "",
        code:"",
        phone:"",
        pw_m:"",
      },
      password: "",

      isSuccess:false,
      isLoading:false,
      //倒计时相关
      countNum:100,
      clockerTime:'',
      isCounting:false,
      //用于focus到input框
      isFocus:{
        phone:true,
        code:false,
        password:false,
      },

    }
  },
  computed : {


  },
  methods :{
    /**
     * 当倒计秒数完成时。
     */
    finishCount (){
      this.isCounting = false;
      countNum:100;
    },
    //发送验证码
    sendCode(){

      let postData = {phone:this.formData.phone,usage:104,type:1}
      if(!this.formData.phone || !this.formData.phone.trim()){
        this.$vux.toast.text(this.$t("message.user.phone_number_cannot_be_empty"));
        return false;
      }
      this.$http.post(config.urls.sendSms,postData).then(res => {
        if(res.data.code === 0) {
          this.$vux.toast.text(this.$t("message.smsCode.hasSend"));
          this.isCounting  = true;
          this.countNum    = 100;
        }else if(res.data.code === 10006){
          this.$vux.toast.text(this.$t("message.user.phone_number_not_need_merge"));
        }else{
          this.$vux.toast.text(res.data.desc);
        }
      })
      .catch(error => {
        console.log(error)
      })
      return false;
    },
    doSubmit (){
       var postData = this.formData;
       postData.pw_m = md5(this.password);
       postData.password = this.password;
       postData.usage = 104;
       postData.type = 1;
       this.isLoading = true;
       this.$http.post(config.urls.checkSmsCode,postData).then(res => {
         if(res.data.code === 0) {
           this.$vux.toast.text(this.$t("message.user.mergeSuccess"));
           this.isSuccess = true;

         }else if(res.data.code === 10101){
           this.$vux.toast.text(this.$t("message.smsCode.codeError"));
         }else{
           this.$vux.toast.text(res.data.desc);
         }
         this.isLoading = false;
       }).catch(error => {
         this.isLoading = false;
         console.log(error);
       })
       return false;

    }


  },

  created () {

  },
  activated (){

  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
p {line-height: 1.6}
.page-view-content { padding: 12px; }
/* 输入框 */
.form-control-line, .form-group .form-control-line { padding-left: 5px;
  border: 0;
  // background-image: linear-gradient(#59488d, #59488d), linear-gradient(#aaaaaa, #aaaaaa);
  background-image: linear-gradient(#59488d, #59488d), linear-gradient(#D2D2D2, #D2D2D2);
  background-size: 0 2px, 100% 1px;
  background-repeat: no-repeat;
  background-position: center bottom, center calc(100% - 1px);
  background-color: transparent;
  transition: background 1s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  font-weight: 400;
  &:focus {
    box-shadow: none; border:none;
    background-image:linear-gradient(#6342a1, #6342a1),linear-gradient(#6342a1, #6342a1);

  }
  // &:active { }
}

/*输入框组*/
.cp-form-group {
  @padding : 8px;
  position: relative; padding: @padding 0;
  label.control-label {  position: absolute; left:3px; top: @padding + 6px;font-size: 16px;
    i.fa { color:#aaa;/* color:rgb(230, 136, 127)*/}
    svg {fill:#aaa;  height: 21px; margin-top: 2px;}
  }
  input.form-control {transition: all .8s; padding-left: 30px;}

}

.cp-form-wrap {  padding: 20px 16px 10px;  background: rgba(255,255,255,1); margin: 0 10px; border:1px solid #DDD; box-shadow: 0 0 20px rgba(0,0,0,.1); border-radius: 5px;
  .form-control {
    padding: 12px 10px 12px 40px; height:50px; border-radius: 0; font-size: 16px;
  }
  .cp-select {border-bottom : 1px solid #ccc;
    &::before { border-top: none}
  }
  label.control-label { min-width: 20px; text-align: center;font-size: 18px; }
  .cp-register {padding-top: 10px; text-align: right; margin: 0}
}
.btn-sendsms { position: absolute;   right:0; top:2px;}
.cp-tips-disclaimer { height: 40px; line-height: 40px; padding-top: 10px; margin-left: -2px;
  .vux-check-icon > span {color: #666;}
}

@media screen and (min-width: 800px) {
  .form-inner { max-width: 600px;margin: 0 auto;}
  .cp-form-group {
    @padding : 8px;
    label.control-label {left:3px; top: @padding  }
  }
}
</style>
