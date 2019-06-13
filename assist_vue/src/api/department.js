import axios from '@/utils/axios'
import configs from '@/configs'

export default {
  getListByDeep(params){
    return new Promise((resole,reject)=>{
      axios({
        url: configs.baseUrl_8082+'/api/v1/department/selects',
        method: 'get',
        params
      }).then(res=>{
        if(res.data.code === 0){
          resole(res.data.data.lists);
        }else{
          reject(res);
        }
      }).catch(error=>{
        reject(error);
      })
    })
  }
}


