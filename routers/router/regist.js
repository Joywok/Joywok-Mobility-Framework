 router.route('/api/attendenceRecords')
     .all(function(req, res, next) {
         next()
     })
     .get(function(req, res, next) {
         var data = fs.readFileSync('routers/files/attendenceRecords.json');
         res.end(JSON.stringify(eval("(" + data + ")")));
         res.writeHead(200, { 'Content-Type': 'application/json' });
         next();
     })
     .post(function(req, res, next) {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var id = parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100);
         var datas = {}
         req.on('data', function(data) {
             datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/attendenceRecords.json') + ')');
             datas['id'] = id;
             DataList['timeCards'].push(datas);
             fs.writeFile('routers/files/attendenceRecords.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function() {
             console.log(JSON.stringify({ data: datas }));
             res.end(JSON.stringify({ data: datas }));
         })
         next()
     })

 router.route('/api/attendenceRecords/:id')
     .all(function(req, res, next) { next() })
     .get(function(req, res, next) {
      console.log(req)
         var url = req.url.split('/');
         var id = url[url.length - 1];
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var data = fs.readFileSync('routers/files/attendenceRecords.json');
         var datas = eval("(" + data + ")");
         _.each(datas["timeCards"], function(item) {
             if (id == item["id"]) {
                 res.end(JSON.stringify({ code: 0, data: { item: item }, systime: Date.parse(new Date()) }));
                 next();
             }
         })
     })
     .put(function(req, res, next) {
         var url = req.url.split('/');
         var id = url[url.length - 1];
         req.on('data', function(data) {
             var datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/attendenceRecords.json') + ')');
             var nowData = _.clone(DataList['timeCards']);
             _.each(nowData, function(item) {
                 if (item["id"] == datas["id"]) {
                     _.extend(item, datas)
                 }
             })
             DataList['timeCards'] = nowData
             Backdatas = _.clone(datas);
             fs.writeFile('routers/files/attendenceRecords.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function(data) {
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({  data: Backdatas}));
         })
     })
     
 router.route('/api/personInfo')
     .all(function(req, res, next) {
         next()
     })
     .get(function(req, res, next) {
         var data = fs.readFileSync('routers/files/personInfo.json');
         res.end(JSON.stringify(eval("(" + data + ")")));
         res.writeHead(200, { 'Content-Type': 'application/json' });
         next();
     })
     .post(function(req, res, next) {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var id = parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100);
         var datas = {}
         req.on('data', function(data) {
             datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/personInfo.json') + ')');
             datas['id'] = id;
             DataList['datas'].unshift(datas);
             fs.writeFile('routers/files/personInfo.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function() {
             res.end(JSON.stringify({ data: datas }));
         })
         next()
     })
