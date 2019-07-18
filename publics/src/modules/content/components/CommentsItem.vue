<template>
  <div class="item" :class="{'is_delete':is_delete}">
    <div class="name"><b>{{name}}</b> / <span class="loginname">{{loginname}}</span></div>
    <div class="num">{{num}}楼</div>
    <div class="time">{{time}}</div>
    <div class="content">{{content}}</div>
  </div>

</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  props: {
    name :String,
    time : String,
    loginname : String,
    content: String,
    num: Number,
    is_delete: Number,
  },
  methods: {

  }
}
</script>

<style scoped >

</style>
