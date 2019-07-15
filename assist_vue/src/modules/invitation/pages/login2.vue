<template>
  <view-box ref="viewBox" class="page-view-register">
    <div class="page-view-content" >
      <div class="cp-register-wrapper">
        <div class="cp-form-wrap">
          <div class="cp-heading" v-show="step!=1">
            <h5 class="cp-inviter">
              <img
                class="cp-avatar"
                :src="inviter.avatar"
                :onerror="'this.src=\''+defaultAvatar+'\';return false'"
              />
              {{inviter.name}}
            </h5>
            <h4>{{$t('message.invitation.InvitingToGroup')}}</h4>
            <!-- <p v-if="groupDetail" class="group-name">【{{groupDetail.tname}}】</p> -->
            <h5>{{$t('message.invitation.LoginnameAccept')}}</h5>
          </div>
        
          <form class="form form-login form-horizontal" method="post" onsubmit="return false">
            <!-- step:0 -->
            <div class="cp-step-item cp-step-item-0" v-show="step==0">
              <div class="cp-form-group">
                <label class="control-label" for="phone">
                  <i class="fa fa-id-card"></i>
                </label>
                <input
                  type="text"
                  class="form-control form-control-line"
                  name="username"
                  :placeholder="$t('message.user.employeeID')"
                  v-model="formData.username"
                  v-focus="isFocus.username"
                  @focus="isFocus.username=true"
                  @blur="isFocus.username=false"
                />
              </div>

             
             
            </div>
            <!-- /step:0 -->

            <!-- step:1-->
            <div class="cp-step-item cp-step-item-1" v-show="step==1">
              <join-success :is_overseas="is_overseas" :status="status"/>
            </div>
            <!-- /step:1 -->

            <div class="text-danger" id="callback-tips"></div>
            <p class="cp-submitbtn-wrapper">
              <button
                class="btn btn-primary btn-lg btn-block J-btn-submit"
                v-show="step===0"
                :disabled="!isEnableNext || isSubmiting"
                @click="signin"
              >{{$t('message.SignIn')}}</button>
            </p>
          </form>
          <!-- <router-link  class="cp-login-btn pull-right"  :to="{ name:'register', params: {link_code: link_code} }" v-show="step==0">
                未有帐号，现在注册 <i class="fa fa-arrow-right"></i>
          </router-link>-->
        </div>
      </div>
    </div>
    <div>
      
    </div>
  </view-box>
</template>

<script>
import config from "@/configs";
import JoinSuccess from "./components/JoinSuccess";
import DisclaimerBtn from "./components/DisclaimerBtn";

export default {
  components: {
    JoinSuccess,DisclaimerBtn,
  },

  data() {
    return {
      link_code: "", //连接邀请码
      step: 0, //第几步
      status: 0,
      //免责声明相关
      isShowDisclaimer: false,
      disclaimerContent: "",
      isLoadingDisclaimer: true,
      isLoadedDisclaimer: false,
      isSubmiting: false,

      inviter: { name: "", avatar: config.defaultAvatar }, //邀请者数据
      groupDetail:null,
      defaultAvatar: config.defaultAvatar, //默认头像
      is_overseas: 0, //是否海外

      //要提交的表单数据
      formData: {
        username: "",
      },

      //用于focus到input框
      isFocus: {
        username: false,
      }
    };
  },
  computed: {
    isEnableNext() {
      switch (this.step) {
        case 0:
          return  this.formData.username.trim() == ""   ? false  : true;
          break;
        default:
          return false;
      }
    },
    
  },
  methods: {
    init() {
      this.link_code = this.$route.params.link_code;
      let query_is_overseas = this.$route.query.is_overseas;
      if(typeof(query_is_overseas)!='undefined'){
        this.is_overseas = query_is_overseas;
      }else if (localStorage) {
        this.is_overseas = localStorage.getItem("is_overseas") == 1 ? 1 : 0 ;
      }
      this.getInvitation();
      console.log(this.is_overseas);
    },
    
    /**
     * 执行登入
     */
    signin() {
      let postData = Object.assign({}, this.formData);
      postData.link_code = this.link_code;
      postData.type = 1;
      
      this.$vux.loading.show();
      this.isSubmiting = true;

      this.$http
        .post(config.urls.signinInvitation, postData)
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            if(data.company_id == 11){
              this.is_overseas = data.company_id == 11 ? 1 : 0;
            }
            this.$vux.toast.text(this.$t("message.invitation.JoinSuccessful"));
            this.step++;
          } else {
            this.$vux.toast.text(res.data.desc);
          }
          this.$vux.loading.hide();
          this.isSubmiting = false;
        })
        .catch(error => {
          console.log(error);
          this.$vux.loading.hide();
          this.isSubmiting = false;
        });
    },

    /**
     * 取得邀请连接的基本信息。
     */
    getInvitation() {
      let params = { link_code: this.link_code };
      this.$vux.loading.show();

      this.$http
        .get(config.urls.getInvitation, { params: params })
        .then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            this.inviter = data.inviter;
            this.groupDetail = data.group_detail;
            this.status = data.status;
            if (data.status == "0") {
              this.step = 1;
            }
            if (data.inviter.imgpath && data.inviter.imgpath.trim() != "") {
              this.inviter.avatar = config.avatarBasePath + data.inviter.imgpath;
            }
          } else {
            this.status = 0;
            this.step = 1;
          }
          this.$vux.loading.hide();
        })
        .catch(err => {
          this.$vux.loading.hide();
        });
    },


   
  },

  created() {
    
  },
  activated() {
    setTimeout(() => {
      this.init();
    }, 500);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
</style>
