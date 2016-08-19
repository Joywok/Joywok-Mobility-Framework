  //任务list列表
  router.route('/spms/task/task')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-task.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    
  //获取单条任务
  router.route('/spms/task/task/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/profile-task.json');
        var datas = eval("("+data+")");
        _.each(datas["data"]["list"],function(item){
          if(id==item["id"]){
            res.end(JSON.stringify({code:0,data:{item:item},systime:Date.parse(new Date())}));
            next();
          }
        })
    })
    .patch(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var Backdatas = {};
        req.on('data',function(data){
          var datas = eval("("+data+")");
          datas.id = id;
          var DataList = eval('('+fs.readFileSync('routers/files/profile-task.json')+')');
          var nowData  = _.clone(DataList['data']['list']);
          _.each(nowData,function(item){
            if(item["id"] == id){
              _.extend(item,datas)
            }
          })
          DataList['data']['list'] = nowData
          Backdatas = _.clone(datas);
          Backdatas.obj_id = Backdatas.id;
          fs.writeFile('routers/files/profile-task.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
        })
    })

  //任务关注
  router.route('/spms/task/task/follow/:id')
    .all(function(req,res,next){next()})
    .put(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var Backdatas = {};

        req.on('data',function(data){
          var datas = eval("("+data+")");
          var DataList = eval('('+fs.readFileSync('routers/files/profile-task.json')+')');
          var nowData  = _.clone(DataList['data']['list']);
          _.each(nowData,function(item){
            if(item["id"] == datas["id"]){
              _.extend(item,datas)
            }
          })
          DataList['data']['list'] = nowData
          Backdatas = _.clone(datas);
          Backdatas.obj_id = Backdatas.id;
          fs.writeFile('routers/files/profile-task.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
        })
        next()
      })