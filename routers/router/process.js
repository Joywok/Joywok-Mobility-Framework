
  //流程列表
  router.route('/spms/approve/approve/')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/process-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  //发起流程
  router.route('/spms/approveapply/submit/')
    .all(function(req,res,next){
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {};
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        Backdatas = _.clone(datas['apply_form']);
        Backdatas.id = id;
        var DataList = eval('('+fs.readFileSync('routers/files/process-list.json')+')');
        var newData = _.clone(DataList["data"]['item']['approvelist']);
        newData.unshift(datas);
        DataList['data']['item']['approvelist'] = newData;
        fs.writeFile('routers/files/process-list.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
        next()
      })
    })

    //读取流程
    router.route('/spms/approveapply/submit/:id')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/process-list.json');
        var datas = eval("("+data+")");
        _.each(datas["data"]["item"]['approvelist'],function(item){
          if(id==item["id"]){
            res.end(JSON.stringify({code:0,data:{item:item},systime:Date.parse(new Date())}));
            next();
          }
        })
      })
      .put(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var Backdatas = {};

        req.on('data',function(data){
          var datas = eval("("+data+")");
          var DataList = eval('('+fs.readFileSync('routers/files/process-list.json')+')');
          var nowData  = _.clone(DataList['data']['item']['approvelist']);
          // console.log(nowData);
          _.each(nowData,function(item){
            if(item["id"] == datas["id"]){
              _.extend(item,datas)
            }
          })
          // console.log(JSON.stringify(_.clone(DataList)));
          DataList['data']['item']['approvelist'] = nowData
          Backdatas = _.clone(datas);
          console.log(Backdatas)
          // Backdatas.obj_id = Backdatas.id;
          fs.writeFile('routers/files/process-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
          console.log({code:0,data:{item:Backdatas},systime:Date.parse(new Date())});
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
          next()
        })
        // req.on('end',function(data){
        
        // })
      })

  //读取流程审批记录
    router.route('/spms/approve/record/')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/process-record-list.json');
        var datas = eval("("+data+")");
        res.end(JSON.stringify(eval("("+data+")")));
        next();
      })


  //同意或退回
  router.route('/spms/approve/approve')
    .all(function(req,res,next){
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {};
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/process-record-list.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/process-record-list.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      next()
    })

    //读取是否有草稿 基本信息没有草稿，计划任务没有草稿  0： 没有；1：项目有；2：任务计划有
    router.route('/spms/project/:id/hasdraft')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        res.end(JSON.stringify({code:0,data:{item:{id:'testpid',hasdraft:1}},systime:Date.parse(new Date())}));
        next();
      })



    









