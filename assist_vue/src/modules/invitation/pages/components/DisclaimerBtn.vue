<template>
  <div class="c-download">
    <div class="cp-tips-disclaimer">
      <check-icon :value.sync="isChecked" type="plain">{{$t('message.invitation.ReadAndAgreed')}}</check-icon>
      <a class="cp-disclaimer-link" @click.prevent="showDisclaimer">《{{$t('message.Disclaimer')}}》</a>

      <!-- <input type="checkbox" name="agree_disclaimer" id="agree_disclaimer" v-model="agree"><label class="label-checkbox" for="agree_disclaimer">已经阅读并同意<a href="">《使用协议》</a></label> -->
    </div>
    <popup v-model="isShowDisclaimer" is-transparent>
      <div
        style="width: 94%; max-width:640px;height:96%; background-color:#fff; margin:16px auto;border-radius:5px; "
      >
        <div style="position:relative;padding:10px;border-bottom:1px solid #DDD;">
          <b>{{$t('message.Disclaimer')}}：</b>
          <a style="padding:3px;" @click="isShowDisclaimer = false;">
            <i class="fa fa-times pull-right"></i>
          </a>
        </div>
        <div class="text-center" v-show="isLoadingDisclaimer">
          <spinner type="dots" size="60px"></spinner>
        </div>

        <article v-html="disclaimerContent" style="padding:12px;"></article>

        <div style="padding:20px 10px 10px;">
          <button
            class="btn btn-primary btn-block"
            @click="isShowDisclaimer = false; isChecked = true;"
          >{{$t('message.agree')}}</button>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import config from "@/configs";

export default {
  props: {
    isChecked: {
      default: () => {
        return false;
      }
    }
  },
  watch:{
    isChecked(val){
      this.$emit("update:isChecked",val);
    }
  },

  data() {
    return {
      isShowDisclaimer: false,
      isLoadingDisclaimer: false,
      disclaimerContent:""
    };
  },
  methods :{
     /**
     * 取得免责声明内容
     */
    showDisclaimer() {
      this.isShowDisclaimer = true;
      if (!this.isLoadedDisclaimer) {
        this.$http.get(config.urls.getDisclaimer).then(res => {
          if (res.data.code === 0) {
            let data = res.data.data;
            this.isShowDisclaimer = true;
            this.isLoadedDisclaimer = true;
            this.isLoadingDisclaimer = false;
            this.disclaimerContent = data.content;
          }
        });
      }
      return false;
    },
  },

};
</script>
