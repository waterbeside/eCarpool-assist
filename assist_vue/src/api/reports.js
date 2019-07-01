import axios from '@/utils/axios'
import configs from '@/configs'

export default {
  getMonthStatic(params){
    return new Promise((resole,reject)=>{
      axios({
        url: configs.apiBaseUrl+'/api/v1/publics/reports/month_statis',
        method: 'get',
        params
      }).then(res=>{
        if(res.data.code === 0){
          resole(res.data);
        }else{
          reject(res);
        }
      }).catch(error=>{
        reject(error);
      })
    })
  }
}


