import axios from '@/utils/axios'
import configs from '@/configs'
import myCache from "@/utils/myCache";

export default {
  getDetail(id,params,setting = {cacheKey:false,exp:3600}){
    if(typeof(setting.cacheKey) !="undefined" && typeof(setting.exp) !="undefined" && setting.cacheKey){
      return myCache.do(setting.cacheKey,[this.getListByDeep,params],setting.exp);
    }
    return new Promise((resole,reject)=>{
      axios({
        url: configs.urls.docs+'/'+id,
        method: 'get',
        params
      }).then(res=>{
        if(res.data.code === 0){
          let data = res.data.data;
          resole(data);
        }else{
          reject(res);
        }
      }).catch(error=>{
        reject(error);
      })
    })
  },
}


