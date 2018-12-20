<template>
  <div class="item" :class="{'is_delete':is_delete}">
    <h3 class="title">{{title}}</h3>
    <div class="time-bar">
      <span class="name"><b>{{name}}</b></span>
      <span class="date">{{time}}</span>
    </div>
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
    title :String,
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
