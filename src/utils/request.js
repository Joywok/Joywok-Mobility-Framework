import request from 'request';

export default function(options){
  const response = request(options,function(error,response,body){
    let successCallBack = options.success;
    let errorCallBack = options.error;
    options.success = function(){
      
    }
    options.error = function(){
      if (errorCallBack) errorCallBack(error,response,body);
    }
  });
}
