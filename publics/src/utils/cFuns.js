import { md5 } from 'vux'

var scrollTimer = null;
var cFuns = {
  /**
   * 取得客户端（浏览器）信息
   */
  getClientType() {
    var browser = {
      versions: function () {
        var u = window.navigator.userAgent;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          Alipay: u.indexOf('Alipay') > -1, //支付宝
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1, //android终端
          linux: u.indexOf('Linux') > -1, //linux
          iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
          mac: u.indexOf('Mac') > -1, //是否为mac
          //iPhone: u.match(/iphone|ipod|ipad/),//
          iPad: u.indexOf('iPad') > -1, //是否为iPad
          webApp: u.indexOf('Safari') == -1, //是否为web应用程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否为微信浏览器
          qq: u.match(/\sQQ/i) !== null, //是否QQ
          Safari: u.indexOf('Safari') > -1,
          ///Safari浏览器,
        };
      }()
    };
    return browser.versions;
  },

  /**
   * 取得连接参数
   * @param  String name 参数key
   */
  getRequest(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  },

  // 切换页面，并错误提示
  turnPage: (message, url) => {
    if (message) {
      alert(message)
    }
    if (url) {
      if (pageMap[url]) {
        url = pageMap[url]
      }
      window.location.href = url
    }
  },

  /**
   * 页面跳转
   * @param  string url URL
   * @param  object win 窗口对像
   */
  redirect(url, win) {
    var lct = typeof (win) != "undefined" ? win.location : location;
    //console.log(lct);
    lct.href = url;
  },


  getLanguage(dontFromCache) {
    dontFromCache = dontFromCache || 0;
    let lang = "";
    if (localStorage && !dontFromCache) {
      lang = localStorage.getItem('language');
      lang = lang ? lang : localStorage.getItem('lang');
      lang = lang ? lang : localStorage.getItem('lag');
    }
    if (lang) {
      return lang;
    }
    var _language = "en";
    if (navigator.language) {
      _language = navigator.language;
    } else {
      _language = navigator.browserLanguage;
    }
    return _language;
  },


  formatLanguage(_language) {
    var arrowLang = "zh,zh-tw,zh-hk,vi,en,"
    var lang = _language;
    var language_lower = _language.toLowerCase();
    if (arrowLang.indexOf(language_lower) == -1) {
      lang = "en";
    }
    if (language_lower.indexOf('-') > 0) {
      var langTempArr = language_lower.split('-');
      lang = langTempArr[0];
    }
    return lang;
  },

  /**
   * 验证反回码是否未登入
   * @param  int code      [返回码]
   * @param  object vueObj    [VUE对像]
   * @param  boolean showToast [是否显示吐司]
   */
  checkLoginByCode(code, vueObj, showToast) {
    showToast = showToast || 1
    if (code === 10004) {

      if (showToast && vueObj) {
        vueObj.$vux.toast.text('请先登入');
      }
      if (vueObj) {
        vueObj.$router.push({
          name: 'login'
        });
      } else {
        this.redirect("/#/login");
      }
      return false;
    }
    return true;
  },


  formatDate(date, fmt) {
    var o = {
      "m+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "i+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

  },

  //个位数补充0
  fixZero(num) {
    num = num >= 0 && num <= 9 ? "0" + num : num;
    return num;
  },

  //格式化日期数据
  formatDayItemData(date, text) {
    text = text || '';
    var month = date.getMonth() + 1;
    month = this.fixZero(month);
    var day = date.getDate();
    day = this.fixZero(day);
    text = text.trim() == '' ? date.getFullYear() + '-' + month + '-' + day : text;
    return {
      "value": (date.getFullYear() + '-' + month + '-' + day),
      "name": text
    }
  },

  /**
   * 加载js
   */
  getScript(setting) {
    return new Promise((resolve, reject) => {
      var settingDefault = {
        async: false,
        defer: false,
      }
      var opt = Object.assign({}, settingDefault, setting);
      const script = document.createElement('SCRIPT')

      script.setAttribute('src', opt.url)
      if (opt.async) {
        script.setAttribute('async', '')
      }
      if (opt.defer) {
        script.setAttribute('defer', '')
      }
      if (script.addEventListener) {
        script.addEventListener('load', () => {
          resolve();
        }, false);
      } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', () => {
          var target = window.event.srcElement;
          if (target.readyState == 'loaded') {
            resolve();
          }
        });
      }
      document.body.appendChild(script);
    })
  },

  formatDepartment(fullNameStr) {
    if (fullNameStr.indexOf(',') > 0) {
      var fullArr = fullNameStr.split(',');
      var departmentName_per = typeof (fullArr[3]) != "undefined" ? fullArr[3] : "";
      var departmentName = typeof (fullArr[4]) != "undefined" ? fullArr[4] : "";
      return departmentName_per + ',' + departmentName;
    } else {
      return fullNameStr;
    }
  },

  getRandomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  },

  strToColor(str){
    let code = md5(md5(str)).slice(8,24).charCodeAt();
    code = Math.sqrt(code/Math.PI)*20;
    let codeArr = (code+'').split('.');
    code = parseFloat('0.'+codeArr[1]);
    let color = '#' + Math.floor((code)* 0xffffff).toString(16);
    return color;
  },
  
  md5(str){
    return md5(str);
  },


}

export default cFuns;
