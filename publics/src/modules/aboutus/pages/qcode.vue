<template>
  <view-box ref="viewBox" class="cp-viewBox">
    <div class="page-view-content">
      <div class="text-center">
        <div class="cp-qrcode-wrapper" style="margin-top:100px;">
          <qrcode
            :value="url"
            type="img"
            style=" text-align:center"
            :size="168"
            fg-color="rgb(21, 53, 68)"
          ></qrcode>
          <img class="cp-logo" src="static/images/carpool80.png" />
        </div>
        <h4 class="cp-title">{{$t("message.esquel_carpool")}}</h4>
        <article class="cp-article">
          <p>
            <!-- 溢路上有你，挤一点也愿意 -->
            {{$t("message.carpool_left_join_trip")}}
          </p>
          <p style="color:#eee">{{is_overseas}} {{url}}</p>
        </article>
      </div>
    </div>
  </view-box>
</template>

<script>
import config from "@/configs";
import { Qrcode } from "vux";

export default {
  components: {
    Qrcode
  },

  data() {
    return {
      is_overseas: 0
    };
  },
  computed: {
    url() {
      return this.is_overseas == 1
        ? "http://esqueler.com"
        : "http://m.esquel.cn/apps/gek/Carpool/";
    }
  },
  methods: {
    init() {
      if (localStorage) {
        setTimeout(() => {
          this.is_overseas = localStorage.getItem("is_overseas");
        }, 500);
      }
    }
  },

  created() {
    this.init();
  },
  activated() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
@qcode-size: 168px;
@logo-size: 34px;

.cp-viewBox {
  //  background: url("../../../assets/images/aboutus_qcode_boot.jpg") center bottom no-repeat ;
  background-size: 100% auto;
}
.cp-qrcode-wrapper {
  position: relative;
  width: @qcode-size;
  margin: 0 auto;
  .cp-logo {
    position: absolute;
    top: @qcode-size / 2-@logo-size / 2;
    left: @qcode-size / 2-@logo-size / 2;
    width: @logo-size;
    border-radius: 4px;
    border: 2px solid #fff;
  }
}
.cp-title {
  margin-top: 20px;
  font-size: 18px;
  color: rgb(39, 95, 121);
}
.cp-article {
  color: rgb(76, 126, 146);
}
@media (min-width: 768px) {
  .cp-viewBox {
    background-size: 400px auto;
  }
}
</style>
