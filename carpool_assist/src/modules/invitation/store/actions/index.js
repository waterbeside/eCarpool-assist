// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。


export default {
  updateRefreshState ({commit}) {
    commit('updateRefreshState')
  },


}
