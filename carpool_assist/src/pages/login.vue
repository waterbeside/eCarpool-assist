<template>
  <view-box ref="viewBox" class="page-view-register " >

        <div class="page-view-content">


          <div class="cp-register-wrapper" >
            <div class="cp-form-wrap">
              <div class="cp-heading" v-show="step!=1">
                <h5 class="cp-inviter">
                  <img class="cp-avatar " :src="inviter.avatar"  :onerror="'this.src=\''+defaultAvatar+'\';return false'">
                  {{inviter.name}}
                </h5>
                <h4>正在邀请您加入溢信群</h4>
                <h5>在此登入即接受邀请</h5>
              </div>
              <msg title="欢迎加入溢起拼车" description="快来下载APP，来免费拼车吧"   icon="" v-show="step==1 && status == 1" ></msg>
              <div v-show="step==1 && !status" class="text-center">
                <h3>欢迎加入溢起拼车</h3>
                <p class="text-center">
                  快来下载APP，来免费拼车吧
                </p>
              </div>


              <form class="form form-login form-horizontal"　 method="post" onsubmit="return false">

                <!-- step:0 -->
                <div class="cp-step-item cp-step-item-0" v-show="step==0">
                  <div class="cp-form-group ">
                    <label  class="control-label "  for="phone"><i class="fa fa-id-card"></i> </label>
                    <input type="text" class="form-control form-control-line  " name="username" placeholder="工号/帐号/手机号" v-model="formData.username" v-focus="isFocus.username" @focus="isFocus.username=true" @blur="isFocus.username=false">

                  </div>

                  <div class="cp-form-group ">
                    <label  class="control-label"  for="password"><i class="fa fa-lock"></i></label>
                    <input type="password" class="form-control form-control-line    " name="password" placeholder="密码" v-model="formData.password" v-focus="isFocus.password" @focus="isFocus.password=true" @blur="isFocus.password=false">
                  </div>

                  <div class="cp-tips-disclaimer">
                    <check-icon :value.sync="agree"  type="plain" >  已经阅读并同意</check-icon><a class="cp-disclaimer-link" @click.prevent="showDisclaimer">《使用协议》</a>

                    <!-- <input type="checkbox" name="agree_disclaimer" id="agree_disclaimer" v-model="agree"><label class="label-checkbox" for="agree_disclaimer">已经阅读并同意<a href="">《使用协议》</a></label> -->
                  </div>
                </div>
                <!-- /step:0 -->

                <!-- step:1-->
                <div class="cp-step-item cp-step-item-1" v-show="step==1">

                  <div class="alert alert-default">

                    <qrcode value="http://m.esquel.cn/apps/gek/Carpool/" type="img" style=" text-align:center" :size="120"></qrcode>
                  </div>
                  <p>
                    <a class="btn btn-primary btn-block btn-lg" href="http://m.esquel.cn/apps/gek/Carpool/downloadandroid.php"><i class="fa fa-android"></i> 安卓下载</a>
                  </p>
                  <p>
                    <a class="btn btn-primary  btn-block btn-lg" href="http://m.esquel.cn/apps/gek/Carpool/downloadios.php"><i class="fa fa-apple"></i> 苹果下载</a>
                  </p>


                </div>
                <!-- /step:1 -->


                <div class="text-danger" id="callback-tips"></div>
                <p class="cp-submitbtn-wrapper">
                  <button class="btn btn-primary btn-lg  btn-block J-btn-submit" v-show="step===0"  :disabled="!isEnableNext" @click="signin">登入</button>
                </p>
              </form>
              <router-link  class="cp-login-btn pull-right"  :to="{ name:'register', params: {link_code: link_code} }" v-show="step==0">
                未有帐号，现在注册 <i class="fa fa-arrow-right"></i>
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
import config from '../configs'

export default {
  components: {


  },

  data () {
    return {
      link_code:'', //连接邀请码
      step:0, //第几步
      status:0,
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
        username:'',
        loginname:'',
      },
      confirm_password:'',

      //用于focus到input框
      isFocus:{

        username:false,
        password:false,
      },

    }
  },
  computed : {
    isEnableNext () {
      switch (this.step) {
        case 0:
          return !this.agree || this.formData.username.trim() == "" ||  this.formData.password.trim() == "" ? false :true;
          break;

        default:
          return false;
      }
    },

  },
  methods :{



    /**
     * 执行登入
     */
    signin (){
      let postData = Object.assign({},this.formData);
      postData.link_code = this.link_code;
      this.$http.post(config.urls.signinInvitation,postData).then(res => {
        // console.log(res)
        if(res.data.code === 0) {
          this.$vux.toast.text('登入成功');
          this.step ++
        }else {
          this.$vux.toast.text('帐号或密码不正确');

        }
      })
      .catch(error => {
        console.log(error)
      })
    },




    /**
     * 取得邀请连接的机本信息。
     */
    getInvitation(){
      let params = {link_code:this.link_code}
      this.$http.get(config.urls.getInvitation,{params:params}).then(res => {
        if(res.data.code === 0) {
          let data = res.data.data;
          this.inviter = data.inviter;
          this.status = data.status;
          if(data.status == '0'){
            this.step = 1;
          }
          if(data.inviter.imgpath && data.inviter.imgpath.trim()!=''){
             this.inviter.avatar = config.avatarBasePath + data.inviter.imgpath;
           }
        }else{
          this.status = 0;
          this.step = 1;

        }
      })
    },



    /**
     * 取得免责声明内容
     */
    showDisclaimer(){
      this.isShowDisclaimer = true;
      if(!this.isLoadedDisclaimer){
        this.$http.get(config.urls.getDisclaimer).then(res => {
          if(res.data.code === 0) {
            let data = res.data.data;
            this.isShowDisclaimer = true;
            this.isLoadedDisclaimer = true;
            this.isLoadingDisclaimer = false;
            this.disclaimerContent = data.content;
          }
        })
      }
      return false;
    },

  },

  created () {

  },
  activated (){
    this.link_code = this.$route.params.link_code;
    this.getInvitation();
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

</style>
