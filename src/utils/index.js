const dev = {
    BASE_URL : "http://192.168.0.182:9002/api",
    // PARAMS:
    OOKIE_EXPIRES : 1 ,
  }
  
  const test = {
    BASE_URL : "https://api.beta.smartauctionhouse.com/api",
      // PARAMS:
    COOKIE_EXPIRES : 1 ,
  }
  
  const prod = {
    BASE_URL : "https://api.beta.smartauctionhouse.com/api",
      // PARAMS:
    COOKIE_EXPIRES : 1 ,
  }
  
  let config = dev;
  
  if(process.env.REACT_APP_STAGE === 'production'){
     config =  prod ;
  
  }else if(process.env.REACT_APP_STAGE === 'test'){
     config = test ;
  
  }
  
  Object.assign(module.exports , config)
