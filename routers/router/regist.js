 router.route('/api/punch')
    .all(function(req,res,next){
      next()
    })
    .get(function(req,res,next){
      var data = fs.readFileSync('routers/files/punch.json');
      res.end(JSON.stringify(eval("("+data+")")));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      next();
    })
    .post(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var datas = {}
      req.on('data',function(data){
        datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/punch.json')+')');
        datas['id'] = id;
        DataList['datas'].unshift(datas);
        fs.writeFile('routers/files/punch.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
        })
      })
      req.on('end',function(){
        res.end(JSON.stringify({code:0,data:datas,systime:Date.parse(new Date())}));
      })
      next()
    })
 router.route('/api/personInfo')
    .all(function(req,res,next){
      next()
    })
    .get(function(req,res,next){
      var data = fs.readFileSync('routers/files/personInfo.json');
      res.end(JSON.stringify(eval("("+data+")")));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      next();
    })
    .post(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var datas = {}
      req.on('data',function(data){
        datas = eval("("+data+")");
        var DataList = eval('('+fs.readFileSync('routers/files/personInfo.json')+')');
        datas['id'] = id;
        DataList['datas'].unshift(datas);
        fs.writeFile('routers/files/personInfo.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
        })
      })
      req.on('end',function(){
        res.end(JSON.stringify({code:0,data:datas,systime:Date.parse(new Date())}));
      })
      next()
    })
