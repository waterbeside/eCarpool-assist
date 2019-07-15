<template>
  <div class="c-download">
    <msg
      :title="$t('message.invitation.WelcomeToJoinGroup')"
      :description="$t('message.invitation.DownloadAppToCarpool')"
      icon
      v-show=" status == 1"
    ></msg>
    <div v-show="!status" class="text-center">
      <h3>{{$t('message.invitation.loseEfficacy')}}</h3>
      <p class="text-center">{{$t('message.invitation.DownloadAppToCarpool')}}</p>
    </div>
    <div class="alert alert-default">
      <qrcode :value="qcode_url" type="img" style=" text-align:center" :size="120"></qrcode>
    </div>
    <p>
        <a class="btn btn-primary btn-block btn-lg"  :href="qcode_url" >
          <i class="fa fa-download" style="float:left; margin-top:2px"></i> {{$t('message.invitation.DownloadBtn')}}
        </a>
      </p>
    <!-- <template v-if="is_overseas == 1">
      <p>
        <a
          class="btn btn-primary btn-block btn-lg"
          href="http://gitsite.net:8082/index/download/carpool?platform=2&type=2"
        >
          <i class="fa fa-android" style="float:left; margin-top:2px"></i> Android
        </a>
      </p>
      <p>
        <a
          class="btn btn-primary btn-block btn-lg"
          href="https://play.google.com/store/apps/details?id=com.esquel.carpool"
        >
          <i class="fa fa-android" style="float:left; margin-top:2px"></i> Google Play
        </a>
      </p>
    </template>
    <template v-else>
      <p>
        <a
          class="btn btn-primary btn-block btn-lg"
          href="http://gitsite.net:8082/index/download/carpool?platform=2"
        >
          <i class="fa fa-android" style="float:left; margin-top:2px"></i> Android
        </a>
      </p>
    </template>
    <p>
      <a
        class="btn btn-primary btn-block btn-lg"
        href="http://m.esquel.cn/apps/gek/Carpool/downloadios.php"
      >
        <i class="fa fa-apple" style="float:left;margin-top:2px"></i> iOS
      </a>
    </p> -->
  </div>
</template>

<script>
export default {
  props: {
    is_overseas: {
      default: () => {
        return 0;
      }
    },
    status: {
      default: () => {
        return 1;
      }
    }
  },

  data() {
    return {};
  },
  computed: {
    qcode_url() {
      return this.is_overseas == 1
        ? "http://esqueler.com"
        : "http://m.esquel.cn/apps/gek/Carpool/";
    }
  }
};
</script>
