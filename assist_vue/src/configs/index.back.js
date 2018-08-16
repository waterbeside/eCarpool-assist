let avatarPic = require('../assets/images/avatar.png');
// let baseDomain = 'http://carpoolchina.test/'
let baseDomain = ''
let baseUrl = baseDomain+':8081'
let baseUrl_8080 = baseDomain+':8080'
let baseUrl_8082 = baseDomain+':8082'

let aMapKey    = ''
let config = {
  baseDomain    : baseDomain ,
  aMapKey       : aMapKey, //高德地图API之KEY。
  avatarBasePath    : baseDomain + '/carpool/images/users/', //头像公共路徑
  defaultAvatar :  avatarPic, //默认头像
  urls          : {
    aMapScript        : 'http://webapi.amap.com/maps?v=1.4.0&key='+aMapKey, //高德地图api
    uploadAvatar      : baseUrl_8080 + '/uploadfile/image',   // 传头像API
    sendSms           : baseUrl + '/carpool/service/send_code', //发送短信
    checkSmsCode      : baseUrl + '/carpool/service/check_code', //发送短信

    getUserInfo       : baseUrl + '/carpool/user/get_user', //取得用户信息
    getInvitation     : baseUrl + '/carpool/im_group/get_invitation', //取得邀请连接信息
    getCompanys       : baseUrl + '/carpool/assist/get_companys', //取得公司列表
    getDisclaimer     : baseUrl + '/carpool/assist/get_disclaimer', //免责声明

    //邀请相关
    signupInvitation  : baseUrl + '/carpool/assist/signup_invitation', //通过邀请注册
    signinInvitation  : baseUrl + '/carpool/assist/signin_invitation', //通过邀请登入

    //报表相关
    reports :{
      reputationSummary : baseUrl_8080 + '/report?method=reputationsummary', //取得拼车总人次。
      getMonthsNotimes : baseUrl + '/carpool/statement/get_months_notimes', //取得各月拼车统计
      getMonthRanking : baseUrl + '/carpool/statement/get_month_ranking', //取得上月或指定月的拼车排名
      getTodayInfo : baseUrl + '/carpool/statement/get_today_info', //取得当天拼车情况
    },

    //文档相关
    docs :  baseUrl_8082 + '/api/v1/docs', //

  }
}

config = Object.assign({}, config)

export default config
