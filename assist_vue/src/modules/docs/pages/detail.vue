<template>
  <view-box ref="viewBox">
    <div class="page-view-content">
      <div class="container" v-if="id">
        <article class="cp-article" v-html="content" v-show="!isShowError"></article>
        <div class="error-text" v-show="isShowError">
          <p>{{$t('message.networkFail')}}</p>
          <a class="btn-refresh btn btn-default" @click="getData">{{$t('message.refresh')}}</a>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import config from "@/configs";
import cFuns from "@/utils/cFuns";
import docApi from "@/api/doc";

export default {
  components: {},

  data() {
    return {
      id: 0,
      title: "",
      content: '<i class="fa fa-spinner fa-spin"></i>',
      lang: "-",
      lang2: "-",
      paramLang: null,
      isShowError: false
    };
  },
  computed: {},
  methods: {
    init() {
      this.paramLang = this.$store.state.paramLang;
      var lang = this.paramLang ? this.paramLang : cFuns.getLanguage();
      this.lang = lang;
      this.content =
        '<div style="text-align:center; margin-top:30px; font-size:20px">\
      <i class="fa fa-spinner fa-spin"></i>\
      </div>';
      this.title = "";
      this.id = this.$route.params.id ? this.$route.params.id : 0;
      this.getData();
    },
    getData() {
      let param = this.paramLang ? { _language: this.paramLang } : null;
      let cacheKey = "carpool:doc:" + this.id + ":" + this.paramLang;
      this.$vux.loading.show();

      docApi
        .getDetail(this.id, param, { cacheKey: false, exp: 60 * 30 })
        .then(res => {
          this.title = res.title;
          document.title = this.title;
          this.content = res.content;
          setTimeout(() => {
            this.isShowError = false;
            this.$vux.loading.hide();
          }, 300);
        })
        .catch(err => {
          this.$vux.loading.hide();
          this.isShowError = true;
        });
    }
  },

  created() {},
  activated() {
    // this.lang2 = localStorage ? localStorage.getItem('language') : "";
    setTimeout(() => {
      this.init();
    }, 100);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
h1 {
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.cp-article {
  padding-top: 20px;
  font-size: 14px;
  color: rgb(86, 116, 129);
}
.test {
  color: #aaa;
}
.error-text {
  text-align: center;
}
@media (min-width: 768px) {
}
</style>
