let avatarPic = require('../assets/images/avatar.png');
let baseDomain = ''
let aMapKey    = ''
let config = {
  baseDomain    : baseDomain ,
  aMapKey       : aMapKey, //高德地图API之KEY。
  avatarBasePath    : '', //头像公共路徑
  defaultAvatar :  avatarPic, //默认头像
  urls          : {
    baseDomain    : baseDomain ,
    aMapKey       : aMapKey, //高德地图API之KEY。
    avatarBasePath    : '', //头像公共路徑
    defaultAvatar :  avatarPic, //默认头像
    urls          : {
      aMapScript        : 'http://webapi.amap.com/maps?v=1.4.0&key='+aMapKey, //高德地图api
      uploadAvatar      : baseDomain_n + 'uploadfile/image',   // 传头像API
      sendSms           : baseDomain + 'carpool/service/send_code', //发送短信
      checkSmsCode      : baseDomain + 'carpool/service/check_code', //发送短信

      getUserInfo       : baseDomain + 'carpool/user/get_user', //取得用户信息
      getInvitation     : baseDomain + 'carpool/im_group/get_invitation', //取得邀请连接信息
      getCompanys       : baseDomain + 'carpool/assist/get_companys', //取得公司列表
      getDisclaimer     : baseDomain + 'carpool/assist/get_disclaimer', //免责声明

      //邀请相关
      signupInvitation  : baseDomain + 'carpool/assist/signup_invitation', //通过邀请注册
      signinInvitation  : baseDomain + 'carpool/assist/signin_invitation', //通过邀请登入

      //报表相关
      reports :{
        reputationSummary : baseDomain_n + 'report?method=reputationsummary', //取得拼车总人次。
        getMonthsNotimes : baseDomain + 'carpool/statement/get_months_notimes', //取得各月拼车统计
      }
    }
  }
}

config = Object.assign({}, config)

export default config
