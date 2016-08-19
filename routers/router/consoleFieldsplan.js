  //项目list列表
  router.route('/spms/console/fieldsplan')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-fieldsplan.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsplan.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fieldsplan.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      next()
    })
    .put(function(req,res,next){
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fieldsplan.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/fieldsplan/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-fieldsplan.json');
        var datas = eval("("+data+")");
        _.each(datas["data"]["list"],function(item){
          if(id==item["id"]){
            res.end(JSON.stringify({code:0,data:{item:item},systime:Date.parse(new Date())}));
            next();
          }
        })
    })
    .put(function(req,res,next){
      var url = req.url.split('/');
      var id = url[url.length-1];
      req.on('data',function(data){
        var datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-fieldsplan.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
      next()
    })
    .delete(function(req,res,next){
      var url = req.url.split('/');
      var id = url[url.length-1];
      var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsplan.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-fieldsplan.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })