 router.route('/api/qiandao')
    .all(function(req,res,next){
    	next()
    })
    .get(function(req,res,next){
      var data = fs.readFileSync('routers/files/qiandao.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/qiandao.json')+')');
        datas['id'] = id;
        DataList['datas'].unshift(datas);
        fs.writeFile('routers/files/qiandao.json',JSON.stringify(_.clone(DataList)),function(err){
            if(err) console.log(err)
        })
      })
      req.on('end',function(){
        res.end(JSON.stringify({code:0,data:datas,systime:Date.parse(new Date())}));
      })
      next()
    })


// router.route('/spms/as/as')
// .all(function(req,res,next){next()})
// .get(function(req,res,next){
//   // 信息流列表的获取
//   var Backdatas = {
//     page:{},
//     info:[]
//   };
//   var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
//   var datasList = datas["data"]["info"];
//   var url = req.url.split('?')[1].split('&');
//   var urlData = {};
//   _.each(url,function(item){
//     var splitData = item.split('=');
//     urlData[splitData[0]] = splitData['1'];
//   })
//   if(req.url.indexOf('max_id')>-1){
//     Backdatas['page']['num'] = datas['data']['page']['num'];
//     Backdatas['page']['pageno'] = 0;
//     Backdatas['page']['pagesize'] = 20;
//     var index = 0;
//     _.each(datasList,function(item,i){
//       if(item["id"] == urlData["max_id"]) index = i+1;
//     });
//     Backdatas['info'] = _.rest(datasList,index);
//     Backdatas['info'] = _.first(Backdatas['info'],10)
//   }else{
//     Backdatas['page']['pageno'] = urlData['pageno'];
//     Backdatas['page']['pagesize'] = urlData['pagesize'];
//     Backdatas['page']['num'] = datas['data']['page']['num']
//     Backdatas['info'] = _.rest(datasList,parseInt(urlData['pageno'])*urlData['pagesize']);
//     Backdatas['info'] = _.first(Backdatas['info'],urlData['pagesize']);
//   }
//   // 单挑信息流的获取
//   // var tm=new Date();
//   // var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
//   // var Backdatas = {}
//   // var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
//   //     favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
//   //       id: "xnqRV7CuSjHm5VX8",
//   //       name: "卢红兵",
//   //       type: "osns_n_user",
//   //       avatar: {
//   //         avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
//   //         avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
//   //       }
//   //     },video_flag: "0",view_num: 0}
//   // _.extend(Backdatas,serverData);
//   //终止
//     res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     next();
// })
// .post(function(req,res,next){
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   var tm=new Date();
//   var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
//   var Backdatas = {}
//   req.on('data',function(data){
//     var datas = eval("("+data+")");
//     console.log(datas,'123123123');
//     datas['id'] = id;
//     var DataList = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
//     var newData = _.clone(DataList["data"]['info']);
//     var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
//       favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
//         id: "xnqRV7CuSjHm5VX8",
//         name: "卢红兵",
//         type: "osns_n_user",
//         avatar: {
//           avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
//           avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
//         }
//       },video_flag: "0",view_num: 0,
//       }
//     _.extend(serverData,datas);
//     //转换
//     serverData['attached_info'] = serverData['append'];
//     if(serverData["link"]&&serverData["link"] !='') serverData['link_info'][0] = serverData['link'];
//     //转换
//     newData.unshift(serverData);
//     DataList['data']['info'] = newData;
//     DataList['data']['page']['num'] = newData.length;
//     Backdatas = _.clone(serverData);
//     fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(DataList)),function(err){
//       if(err) console.log(err)
//     })
//   })
//   req.on('end',function(){
//     res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
//   })
//   next();
// })