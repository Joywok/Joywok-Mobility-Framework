module.exports = function(app,url){
  //开始
  app.route(url+'/demo')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({data:'xxxxxx'}));
      next();
    })
    .post(function(req, res, next){
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        Backdatas = datas;
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:Backdatas}));
      next()
    })
    .put(function(req,res,next){
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        Backdatas = _.clone(datas)
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas}));
      })
    })
  //结尾
}