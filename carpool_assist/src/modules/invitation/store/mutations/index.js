// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// this.$store.commit(method, params)

import store from '../'

import config from '../../../../configs'

export default {
  //设置用户详细数据
  setJumpTo(state,datas){
    state.jumpTo = datas;
  },

  //设置用户详细数据
  setRegisterFormData(state,datas){
    state.registerFormData = datas;
  },



}
