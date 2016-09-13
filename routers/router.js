var _ = require('underscore');
var fs = require('fs');

module.exports = function(router){
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
             // console.log(JSON.stringify({ data: datas }));
             res.end(JSON.stringify({ data: datas }));
         })
         next()
     })

 router.route('/api/attendenceRecords/:id')
     .all(function(req, res, next) { next() })
     .get(function(req, res, next) {
         var url = req.url.split('/');
         var id = url[url.length - 1];
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var data = fs.readFileSync('routers/files/attendenceRecords.json');
         var datas = eval("(" + data + ")");
         _.each(datas["timeCards"], function(item) {
             if (id == item["id"]) {
                 res.end(JSON.stringify({ data: { item: item } }));
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
            console.log(123);
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ data: Backdatas }));
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
             res.end(JSON.stringify({ code: 0, data: datas, systime: Date.parse(new Date()) }));
         })
         next()
     })



 router.route('/api/zhailei')
     .all(function(req, res, next) { next() })
     .get(function(req, res, next) {
         var DataList = eval('(' + fs.readFileSync('routers/files/list.json') + ')');
         res.end(JSON.stringify({ code: 0, data: DataList, systime: Date.parse(new Date()) }));
     })
     .post(function(req, res, next) {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var id = parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100) + '' + parseInt(Math.random(0, 100) * 100);
         var datas = {}
         req.on('data', function(data) {
             datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/list.json') + ')');
             datas['id'] = id;
             datas.date = Date.parse(new Date());
             DataList['datas'].unshift(datas);
             fs.writeFile('routers/files/list.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function() {
             res.end(JSON.stringify({ code: 0, data: datas, systime: Date.parse(new Date()) }));
         })
     })

 router.route('/api/member')
     .all(function(req, res, next) {
         next()
     })
     .get(function(req, res, next) {
         var data = fs.readFileSync('routers/files/user.json');
         res.end(JSON.stringify(eval("(" + data + ")")));
         res.writeHead(200, { 'Content-Type': 'application/json' });
         next();
     })


 router.route('/api/member/:id')
     .all(function(req, res, next) { next() })
     .put(function(req, res, next) {
         var url = req.url.split('/');
         var id = url[url.length - 1];
         req.on('data', function(data) {
             var datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/user.json')+ ')');
             var nowData = _.clone(DataList['allmember']);
             _.each(nowData, function(item) {
                 if (item["id"] == datas["id"]) {
                     _.extend(item, datas)
                 }
             })
             DataList['allmember'] = nowData
             Backdatas = _.clone(datas);
             fs.writeFile('routers/files/user.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function(data) {
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ data: Backdatas }));
         })
     })

 router.route('/api/workSystem')
     .all(function(req, res, next) {
         next()
     })
     .get(function(req, res, next) {
         var data = fs.readFileSync('routers/files/workSystem.json');
         res.end(JSON.stringify(eval("(" + data + ")")));
         // var DataList = eval('(' + fs.readFileSync('routers/files/user.json') + ')');
         // res.end(JSON.stringify(DataList));
         next();
     })

 router.route('/api/workSystem/:id')
     .all(function(req, res, next) {
         next()
     })
     .put(function(req, res, next) {
         var url = req.url.split('/');
         var id = url[url.length - 1];
         req.on('data', function(data) {
             var datas = eval("(" + data + ")");
             var DataList = eval('(' + fs.readFileSync('routers/files/workSystem.json') + ')');
             var nowData = _.clone(DataList['data']);
             _.each(nowData, function(item) {
                 if (item["id"] == datas["id"]) {
                     _.extend(item, datas)
                 }
             })
             DataList['data'] = nowData
             Backdatas = _.clone(datas);
             fs.writeFile('routers/files/workSystem.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function(data) {
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify({ data: Backdatas }));
         })
     })
 router.route('/api/messegeNotify')
     .all(function(req, res, next) {
         next()
     })
     .get(function(req, res, next) {
         var data = fs.readFileSync('routers/files/messegeNotify.json');
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
             var DataList = eval('(' + fs.readFileSync('routers/files/messegeNotify.json') + ')');
             datas['id'] = id;
             // DataList.push(datas);
             DataList=datas;
             fs.writeFile('routers/files/messegeNotify.json', JSON.stringify(_.clone(DataList)), function(err) {
                 if (err) console.log(err)
             })
         })
         req.on('end', function() {
             res.end(JSON.stringify({ data: datas }));
         })
         next()
     })
     .put(function(req, res, next) {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         var data = fs.readFileSync('routers/files/messegeNotify.json');
         console.log(data);
         res.end(JSON.stringify(eval("(" + data + ")")));
         next();
     })
     // .put(function(req, res, next) {

     //     req.on('data', function(data) {
     //         var datas = eval("(" + data + ")");
     //         var DataList = eval('(' + fs.readFileSync('routers/files/messegeNotify.json') + ')');
     //         var nowData = _.clone(DataList);
     //         _.each(nowData, function(item) {
     //             if (item["id"] == datas["id"]) {
     //                 _.extend(item, datas)
     //             }
     //         })
     //         DataList= nowData
     //         Backdatas = _.clone(datas);
     //         fs.writeFile('routers/files/messegeNotify.json', JSON.stringify(_.clone(DataList)), function(err) {
     //             if (err) console.log(err)
     //         })
     //     })
     //     req.on('end', function(data) {
     //         res.writeHead(200, { 'Content-Type': 'application/json' });
     //         res.end(JSON.stringify({ data: Backdatas }));
     //     })
     // })


//结尾
}