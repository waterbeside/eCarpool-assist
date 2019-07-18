<template>
  <div class="list-loading-wrapper">
    <div class="list-no-more" v-show="show_noData">
      {{noDataText}}
    </div>
    <div class="list-loadmore-bar" v-show="show_loadMore" @click = "loadMore">
      {{loadMoreText}}
    </div>
    <div class="cp-loading-l" v-show="show_loading" >
      <span></span><span></span><span></span><span></span>
    </div>
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
    show_noData :Boolean,
    show_loadMore :Boolean,
    show_loading : Boolean,
    noDataText : {
      default:'没有数据'
    },
    loadMoreText : {
      default:'加载更多'
    }
  },
  methods: {
    loadMore (){
      this.$emit('load-more');
    }
  }
}
</script>

<style scoped >

</style>
