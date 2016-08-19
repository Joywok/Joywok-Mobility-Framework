
  //项目list列表
  router.route('/spms/project/projects')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var data = fs.readFileSync('routers/files/project-new.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next()
    })
    .put(function(req,res,next){
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/project/projects/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var id = req.params.id;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if(req._parsedUrl.query != null){
          var data = fs.readFileSync('routers/files/project-detail.json');
          var datas = eval("("+data+")");
          res.end(JSON.stringify(datas));
          next();
        }else{
          var data = fs.readFileSync('routers/files/project-show.json');
          var datas = eval("("+data+")");
          res.end(JSON.stringify(eval("("+data+")")));
        }

    })
    .put(function(req,res,next){
      var url = req.url.split('/');
      var id = url[url.length-1];
      req.on('data',function(data){
        var datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目关注
  router.route('/spms/project/follow/:id')
    .all(function(req,res,next){next()})
    .put(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        var Backdatas = {};

        req.on('data',function(data){
          var datas = eval("("+data+")");
          var DataList = eval('('+fs.readFileSync('routers/files/project-list.json')+')');
          var nowData  = _.clone(DataList['data']['list']);
          _.each(nowData,function(item){
            if(item["id"] == datas["id"]){
              _.extend(item,datas)
            }
          })
          DataList['data']['list'] = nowData
          Backdatas = _.clone(datas);
          Backdatas.obj_id = Backdatas.id;
          fs.writeFile('routers/files/project-list.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
          })
        })
        req.on('end',function(data){
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({code:0,data:{item:Backdatas},systime:Date.parse(new Date())}));
        })
        next()
      })
  //项目树
  router.route('/spms/project/tree')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-tree.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  //里程碑列表
  router.route('/spms/milestone/milestone')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-milestone.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  //项目燃尽图
  router.route('/spms/project/progress/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-progress.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

     //添加子项目
  router.route('/spms/project/workpages/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-workpages.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

     router.route('/spms/project/workpackages/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-workpackages.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


    ///spms/Dictionary/custom?type=projecttype&active=2

router.route('/spms/Dictionary/custom')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-custom.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

router.route('/spms/project/startproject/:id')
    .all(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {item: {status: {id:3, name:'已启动'}}}}));
        next()
    })

router.route('/spms/project/:id/workpackages')
    .all(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {item: {status: {id:3, name:'已启动'}}}}));
        next()
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/workpackages.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


router.route('/spms/project/version')
    .all(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {item: {status: {id:3, name:'已启动'}}}}));
        next()
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-versionlist.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


router.route('/spms/project/version')
    .all(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {item: {status: {id:3, name:'已启动'}}}}));
        next()
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-versionlist.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

router.route('/spms/project/projecttree/:id')
    .all(function(req,res,next){
      next();
    })
    .put(function(req,res,next){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({data: {item: {status: {id:3, name:'已启动'}}}}));
        next()
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/tree.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


