/**
 * myCache工具
 */
const myCache = {
  get:(key,s=0)=>{
    let storageObj = s === 's' ? window.sessionStorage : window.localStorage ;
    if(!storageObj){
      return null;
    }
    let res = storageObj.getItem(key)
    let now = (new Date()).valueOf();
    if(res){
        let data = JSON.parse(res);
        if(typeof(data.exp)=='undefined'){
          return data;
        }
        if(data.exp === 0 || parseInt(data.exp) > (new Date()).valueOf() ){
          return typeof(data.data)!='undefined' ? data.data : null;
        }
        return null
    }else{
      return null;
    }
  },

  set:(key,value,exp=0)=>{
    let storageObj = exp === 's' ? window.sessionStorage : window.localStorage ;
    if(!storageObj){
      return null;
    }
    let now = (new Date()).valueOf();
    let setData = {
      exp:exp === 0 ? 0 : exp*1000 + now,
      data:value
    }
    let dataString = JSON.stringify(setData);
    storageObj.setItem(key,dataString);
    return;
  },

  do:(key,[fun,data=null,type="res"],exp=0)=>{
    return new Promise((resole,reject)=>{
      let resData = myCache.get(key,exp);
      if(resData === null){
        if(typeof(fun)=='function'){
          fun(data).then(res=>{
            resData = res ;
            if(type != 'res'){
              let type_arr = type.split('.');
              for(let i in type_arr){
                resData = resData[type_arr[i]];
              }
            }
            myCache.set(key,resData,exp);
            resole(resData);
          }).catch(err=>{
            console.log(err);
            reject(err);
          });
        }else{
          reject(new Error('Error function'))
        }
      }else{
        resole(resData);
      }
    })
    
  }  
}


export default myCache;