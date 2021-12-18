const dev = {
    BASE_URL : "https://api.beta.smartauctionhouse.com/api",
    WEB_SOCKET_BASE_URL: "ws://api.beta.smartauctionhouse.com/ws",
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
