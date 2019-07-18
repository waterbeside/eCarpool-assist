<template>
  <view-box ref="viewBox" class="page-view-register " >

        <div class="page-view-content">


          <div class="cp-register-wrapper" >
            <div class="cp-form-wrap">
              <div class="cp-heading" v-show="step!=2">
                <template v-if="inviter.name != ''">
                  <h5 class="cp-inviter">
                    <img class="cp-avatar " :src="inviter.avatar"  :onerror="'this.src=\''+defaultAvatar+'\';return false'">
                    {{inviter.name}}
                  </h5>
                  <h4>正在邀请您加入溢信群</h4>
                  <h5>请完善资料来溢起拼车吧</h5>
                </template>
                <template v-else>
                  <h4 style="margin-top:50px;">欢迎注册《溢起拼车》</h4>
                </template>

              </div>
              <msg title="欢迎加入溢起拼车" description=""   icon="" v-show="step==2" ></msg>


              <form class="form form-register form-horizontal" method="post" onsubmit="return false">
                 <div>
                  <step class="cp-step" v-model="step"  gutter="20px">
                    <step-item title="设置帐号"></step-item>
                    <step-item title="完善资料"></step-item>
                    <step-item title="完成注册"></step-item>
                  </step>

                </div>
                <!-- step:0 -->
                <div class="cp-step-item cp-step-item-0" v-show="step==0">
                  <div class="cp-form-group ">
                    <label  class="control-label "  for="phone"><i class="fa fa-phone"></i> </label>
                    <input type="tel" class="form-control form-control-line " id="phone" name="phone" placeholder="手机号" v-model="formData.phone" autocomplete="false" v-focus="isFocus.phone" @focus="isFocus.phone=true" @blur="isFocus.phone=false">
                    <button class="btn btn-default btn-sendsms "   :disabled="isCounting" @click.prevent="sendCode" id="btnSendCode">
                      <span v-show="!isCounting">获取验证码</span>
                      <span  v-show="isCounting">重发 ( <countdown v-model="countNum" :start="isCounting" @on-finish="finishCount"></countdown> )</span>
                    </button>
                  </div>
                  <div class="cp-form-group">
                      <label  class="control-label "  for="code"><i class="fa fa-check-circle-o"></i> </label>
                      <input type="text" class="form-control form-control-line   " name="code" placeholder="短信验证码" v-model="formData.code" v-focus="isFocus.code" @focus="isFocus.code=true" @blur="isFocus.code=false">
                    <!-- <div class="help-block">可使用手机号、邮箱、帐号名登入</div> -->
                  </div>
                  <div class="cp-form-group ">
                    <label  class="control-label"  for="password"><i class="fa fa-lock"></i></label>
                    <input type="password" class="form-control form-control-line    " name="password" placeholder="密码" v-model="formData.password" v-focus="isFocus.password" @focus="isFocus.password=true" @blur="isFocus.password=false">
                  </div>
                  <div class="cp-form-group ">
                    <label  class="control-label"  for="confirm_password">
                      <svg class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M760.171097 415.494703 346.927843 415.494703l0-67.441135c0-91.90006 74.809514-166.709574 166.811913-166.709574 92.002399 0 166.811913 74.911853 166.811913 166.914251 0 12.485309 10.029182 22.514491 22.514491 22.514491s22.514491-10.029182 22.514491-22.514491c0-116.870678-95.072556-211.943234-211.840895-211.943234-56.593244 0-109.809314 22.002798-149.823706 62.01719-40.014391 40.014391-62.01719 93.128123-62.01719 149.721367L301.898861 415.494703l-47.485109 0c-27.631421 0-49.736558 22.105137-49.736558 49.634219l0 341.913252c0 27.631421 22.207476 50.452928 49.736558 50.452928l505.655007 0c27.631421 0 50.35059-22.821507 50.35059-50.452928L810.419348 465.128923C810.521687 437.59984 787.802518 415.494703 760.171097 415.494703zM765.492704 807.553868c0 2.763142-2.251449 5.014591-5.014591 5.014591L254.720768 812.568459c-2.763142 0-5.014591-2.251449-5.014591-5.014591L249.706176 465.538277c0-2.763142 2.251449-5.014591 5.014591-5.014591l505.655007 0c2.763142 0 5.014591 2.251449 5.014591 5.014591L765.390366 807.553868zM644.528483 527.862483 463.286828 709.104138c-0.511693 0.511693-1.228063 0.511693-1.637418 0l-73.069758-73.069758c-8.801119-8.801119-23.026184-8.801119-31.827304 0-8.801119 8.801119-8.801119 23.026184 0 31.827304l73.069758 73.069758c9.005797 9.005797 20.877074 13.508695 32.646012 13.508695 11.871277 0 23.640216-4.502898 32.646012-13.508695l181.241655-181.241655c8.801119-8.801119 8.801119-23.026184 0-31.827304C667.554667 519.061363 653.329602 519.061363 644.528483 527.862483z" /></svg>
                    </label>
                    <input type="password" class="form-control form-control-line  "  name="confirm_password" placeholder="确认密码" v-model="confirm_password" >
                  </div>
                  <div class="cp-tips-disclaimer">
                    <check-icon :value.sync="agree"  type="plain" >  已经阅读并同意</check-icon><a class="cp-disclaimer-link" @click.prevent="showDisclaimer">《使用协议》</a>

                    <!-- <input type="checkbox" name="agree_disclaimer" id="agree_disclaimer" v-model="agree"><label class="label-checkbox" for="agree_disclaimer">已经阅读并同意<a href="">《使用协议》</a></label> -->
                  </div>
                </div>
                <!-- /step:0 -->
                <!-- step:1 -->
                <div class="cp-step-item cp-step-item-1" v-show="step==1">
                  <div class="cp-form-group ">
                    <label  class="control-label "  for="name"><i class="fa fa-user"></i> </label>
                    <input type="text" class="form-control form-control-line  " name="name" placeholder="真实姓名" v-model="formData.name">
                  </div>
                  <div class="cp-form-group ">
                    <label  class="control-label "  for="sexs"><i class="fa fa-venus-mars"></i> </label>
                    <popup-radio class="cp-select" title="" :options="sexs" v-model="formData.sex" placeholder="性别"></popup-radio>
                    <!-- <input type="text" class="form-control form-control-line  " name="conpany" placeholder="" v-model="formData.conpany"> -->
                  </div>
                  <!-- <div class="cp-form-group ">
                    <label  class="control-label "  for="company"><i class="fa fa-building"></i> </label>
                    <popup-radio class="cp-select" title="" :options="companys" v-model="formData.company" placeholder="选择公司">
                    </popup-radio>
                  </div> -->

                  <!--<div class="cp-form-group ">
                    <label  class="control-label "  for="loginname"><i class="fa fa-id-card"></i> </label>
                    <input type="text" class="form-control form-control-line  " name="loginname" placeholder="填写帐号名/工号" v-model="formData.loginname">
                  </div>-->

                </div>
                <!-- /step:1 -->
                <!-- step:2 -->
                <div class="cp-step-item cp-step-item-1" v-show="step==2">
                  <div class="alert alert-default">
                    <p style="padding-bottom:20px">
                      你已注册成为《溢起拼车》的一份子，快来下载APP，来免费拼车吧！
                    </p>
                    <qrcode value="http://m.esquel.cn/apps/gek/Carpool/" type="img" style=" text-align:center" :size="120"></qrcode>
                  </div>
                  <p>
                    <a class="btn btn-primary btn-block btn-lg" href="http://m.esquel.cn/apps/gek/Carpool/downloadandroid.php"><i class="fa fa-android"></i> 安卓下载</a>
                  </p>
                  <p>
                    <a class="btn btn-primary  btn-block btn-lg" href="http://m.esquel.cn/apps/gek/Carpool/downloadios.php"><i class="fa fa-apple"></i> 苹果下载</a>
                  </p>

                </div>
                <!-- /step:2 -->


                <div class="text-danger" id="callback-tips"></div>
                <p class="cp-submitbtn-wrapper">
                  <button class="btn btn-primary btn-lg  btn-block J-btn-submit" v-show="step!=2" data-loading-text="提交中..." :disabled="!isEnableNext" @click="nextStep">下一步</button>
                  <button class="btn btn-default btn-block " v-show="step==1"  data-loading-text="提交中..."   @click="step--">返回上一步</button>
                </p>
              </form>
              <router-link  class="cp-login-btn pull-right"  :to="{ name:'login', params: {link_code: link_code} }" v-show="step==0">
                我有帐号，现在登入 <i class="fa fa-arrow-right"></i>
              </router-link>
            </div>

          </div>
        </div>
        <div >
          <popup v-model="isShowDisclaimer"   is-transparent>

            <div style="width: 94%; max-width:640px;height:96%; background-color:#fff; margin:16px auto;border-radius:5px; ">
              <div style="position:relative;padding:10px;border-bottom:1px solid #DDD;">
                <b>使用协议：</b>
                <a style="padding:3px;" @click="isShowDisclaimer = false;"><i  class="fa fa-times pull-right"  ></i></a>
              </div>
              <div class="text-center" v-show="isLoadingDisclaimer">
                <spinner type="dots" size="60px" ></spinner>
              </div>

              <article  v-html="disclaimerContent" style="padding:12px;"></article>


             <div style="padding:20px 10px 10px;">
               <button class="btn btn-primary btn-block" @click="isShowDisclaimer = false; agree = true;">同意</button>

             </div>
            </div>
          </popup>
        </div>
   </view-box>

</template>

<script>
import config from '@/configs'


export default {
  components: {


  },

  data () {
    return {
      link_code:'', //连接邀请码
      step:0, //第几步

      //免责专用明相关
      isShowDisclaimer:false,
      disclaimerContent:'',
      isLoadingDisclaimer:true,
      isLoadedDisclaimer:false,
      agree:false,

      inviter:{name:'',avatar:config.defaultAvatar}, //邀请者数据
      defaultAvatar: config.defaultAvatar, //默认头像

      phone_ok:'',//验证成功后的手机号
      //要提交的表单数据
      formData:{
        phone:'',
        password:'',
        code:'',
        // loginname:'',
        name:'',
      },
      confirm_password:'',
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
      //公司表列
      companys: [{
        key: '1',
        value: 'Esquel '
      }, {
        key: '0',
        value: '其它'
      }],
      //性别
      sexs: [{
        key: '1',
        value: '男'
      }, {
        key: '2',
        value: '女'
      }],
    }
  },
  computed : {
    isEnableNext () {
      switch (this.step) {
        case 0:
          return !this.agree || this.formData.phone.trim() == "" ||  this.formData.password.trim() == "" || this.formData.code.trim()=="" || this.confirm_password.trim()=="" ? false :true;
          break;
        case 1:
        // return  this.formData.name.trim() == "" ||  this.formData.loginname.trim() == "" || this.formData.sex =="" || this.formData.company_id =="" ? false :true;
          return  this.formData.name.trim() == "" ||   this.formData.sex =="" || this.formData.company_id =="" ? false :true;
          break;
        default:
          return false;
      }
    },

  },
  methods :{
    init (){
      this.link_code = this.$route.params.link_code;
      let query = this.$route.query;
      this.$router.push({name:'login',params: {link_code: this.link_code},query})
      this.getInvitation();
    },
    resetError (){
        this.iconType = ''
        this.isShowError = false;
    },

    /**
     * 点击下一步时。
     */
    nextStep () {
      let _this = this;
      switch (this.step) {
        case 0:
          alert('现在不开放注册,请直接登录');return false;
          if(_this.formData.password.length<6){
            _this.$vux.toast.text('密码不得少于6位');
            _this.isFocus.password = true;
            return false;
          }
          if(_this.formData.password != _this.confirm_password){
            _this.$vux.toast.text('两次密码输入不一致');
            _this.isFocus.password = true;
            return false;
          }
          this.checkSmsCode().then(function(res){
            _this.step ++
          }).catch(error => {
            console.log(error)
          })
          break;
        case 1:
          _this.signup();

          break;
        default:

      }

    },

    /**
     * 执行注册
     */
    signup (){
      let postData = Object.assign({},this.formData);
      postData.link_code = this.link_code;
      this.$http.post(config.urls.signupInvitation,postData).then(res => {
        // console.log(res)
        if(res.data.code === 0) {
          this.$vux.toast.text('注册成功');
          this.step ++
        }else if(res.data.code === 10006){
          this.$vux.toast.text('用户名/工号，已被占用');
        }else {
          this.$vux.toast.text(res.data.code);
        }
      })
      .catch(error => {
        console.log(error)
      })
    },


    /**
     * 当倒计秒数完成时。
     */
    finishCount (){
      this.isCounting = false;
      countNum:100;
    },

    /**
     * 取得邀请连接的机本信息。
     */
    getInvitation(){
      let _this = this;
      let params = {link_code:_this.link_code}
      _this.$http.get(config.urls.getInvitation,{params:params}).then(res => {
        if(res.data.code === 0) {
          let data = res.data.data;
          _this.inviter = data.inviter;
          if(data.inviter.imgpath && data.inviter.imgpath.trim()!=''){
             _this.inviter.avatar = config.avatarBasePath + data.inviter.imgpath;
           }
          // console.log(_this.inviter)
        }
      })
    },

    /**
     * 取得公司列表。
     */
    // getCompany(){
    //   let _this = this;

    //   _this.$http.get(config.urls.getCompanys).then(res => {
    //     // console.log(res)
    //     if(res.data.code === 0) {
    //       let data = res.data.data;
    //       if(data.lists.length > 0){
    //         _this.companys = [];
    //         data.lists.forEach((value,index,arr)=>{
    //           let vStr = value.company_name == value.short_name ?  value.short_name : value.company_name + ' ('+value.short_name+') ';
    //           _this.companys[index]  = {
    //             key:value.company_id,
    //             value: vStr,
    //           }  ;
    //         });
    //         _this.companys.push({
    //           key:0,
    //           value: '其它',
    //         });
    //       }
    //     }
    //   })
    // },

    /**
     * 取得免责声明内容
     */
    showDisclaimer(){
      this.isShowDisclaimer = true;
      if(!this.isLoadedDisclaimer){
        let _this = this;
        _this.$http.get(config.urls.getDisclaimer).then(res => {
          if(res.data.code === 0) {
            let data = res.data.data;
            _this.isShowDisclaimer = true;
            _this.isLoadedDisclaimer = true;
            _this.isLoadingDisclaimer = false;
            _this.disclaimerContent = data.content;
          }
        })
      }
      return false;
    },

    /**
     * 验证短信验证码。
     */
    checkSmsCode(isEndCheck){
      let _this = this;
      let postData = {phone:_this.formData.phone,code:_this.formData.code,usage:101,step:isEndCheck ? 0 : 1}

      return new Promise ( function (resolve, reject) {
        if(!_this.formData.phone || !_this.formData.phone.trim()){
          _this.$vux.toast.text('手机号不能为空');
          reject('fail');
        }
        _this.$http.post(config.urls.checkSmsCode,postData).then(res => {
          // console.log(res)
          if(res.data.code === 0) {
            _this.phone_ok = _this.formData.phone;
            resolve(res);
          }else{
            _this.$vux.toast.text('验证码错误');
            _this.isFocus.code = true;
            reject('error');
          }
        })
        .catch(error => {
          reject(error);
          console.log(error)
        })

      })

    },
    //发送验证码
    sendCode(){
      let _this = this;

      let postData = {phone:_this.formData.phone,usage:101}
      if(!_this.formData.phone || !_this.formData.phone.trim()){
        _this.$vux.toast.text('手机号不能为空');
        return false;
      }
      _this.$http.post(config.urls.sendSms,postData).then(res => {
        if(res.data.code === 0) {
          _this.$vux.toast.text('验证码已发送');
          _this.isCounting = true;
          _this.countNum = 100;
        }else{
          if(res.data.code ==10006) {
            _this.$vux.toast.text('手机号已被注册，可直接登入');
          }
          if(res.data.code == -10002) {
            _this.$vux.toast.text('手机号格式不正确');
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
      return false;
    },
    login (){

    },

  },

  created () {
    console.log(1)
     this.init();

  },
  activated (){
    // console.log(2)
    //  this.init();


  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
</style>
