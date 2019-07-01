import axios from '@/utils/axios'
import configs from '@/configs'
import myCache from "@/utils/myCache";

export default {
  getListByDeep(params,setting = {cacheKey:false,exp:3600}){
    if(typeof(setting.cacheKey) !="undefined" && typeof(setting.exp) !="undefined" && setting.cacheKey){
      return myCache.do(setting.cacheKey,[this.getListByDeep,params],setting.exp);
    }
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
  },

  
  getDeep3ItemData(id){
    return new Promise((resole,reject)=>{
      this.getListByDeep({ deep: 3 },{cacheKey:"carpool:departmet:selects:deep3",exp:3600}).then(res=>{
        let lists = res;
        let returnData = null;
        for(let i in lists){
          let item = lists[i];
          if(item.id == id){
            returnData = item;
            break;
          }
        } 
        resole(returnData);      
      }).catch(error=>{
        reject(error);
      })
    })
  }
}


