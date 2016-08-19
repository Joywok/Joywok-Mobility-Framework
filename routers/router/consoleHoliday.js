  router.route('/spms/calendar/calendar')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
        // console.log(req.url);
        var url = req.url.split('?');
        var data = fs.readFileSync('routers/files/console-holiday.json');
      
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    //修改单天类型
    .put(function(req, res, next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-holiday-put.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    //批设置假期
    .post(function(req,res,next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-holiday-betch.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    });

