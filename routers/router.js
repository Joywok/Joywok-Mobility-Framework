var _ = require('underscore');
var fs = require('fs');

module.exports = function(router){
// 成果列表
router.route('/spms/achievement/achievements/pid/:pid')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievements.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 项目成果文档列表
router.route('/spms/achievement/:achievementid/achievementdocs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs-put.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 上传项目成果文档
router.route('/spms/achievement/:chievement_id/achievementdoc/')
  .all(function(req, res, next){
    next();
  })
  .post(function(req,res,next){
    var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-achievementdocs-post.json');
    res.end(JSON.stringify({code:0, data:eval("(" + data + ")"), systime:Date.parse(new Date())}));
  });

// 项目文档列表
router.route('/spms/project/:pid/docs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-docs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 非项目成果文档列表
router.route('/spms/project/:pid/nonachdocs/')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-nonachdocs.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 数据字典
router.route('/spms/achievement/docTypelist')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/docTypelist.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });


//获取评论
router.route('/spms/as/comments(/:id)')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.end(JSON.stringify({code:0,data:{list:[
        {
          app_id: "ZsznND6lcBCSqnkS",
          app_type: "spms_project",
          content: "dsadsadas",
          created_at: "1422434544",
          id: "8D60t1mcgWdYWpw5",
          reply_id: "",
          uid: "xnqRV7CuSjHm5VX8",
          user:{
            avatar: {
              avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm"
            },
            depts: "",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵"
          }
        }
      ],page:{num:89,pageno:1,pagesize:10}},systime:Date.parse(new Date())}));
    next();
  })
router.route('/spms/as/comments')
  .all(function(req,res,next){next()})
  .post(function(req,res,next){
    var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var Backdatas = {item:{
        app_id: "ZsznND6lcBCSqnkS",
        app_type: "spms_project",
        at_oids: "[]",
        at_uids: "[]",
        client_info: "",
        client_type: "",
        contain_info: "[]",
        content: "dsadsadsada",
        created_at: "1422434544",
        domain_id: "0SvtS2hJJSvZL0Fa",
        id: id,
        ip: "",
        mac_addr: "",
        memo: "",
        reply_id: "",
        reply_list: "[]",
        reported_num: "0",
        sys_id: "OSNS",
        uid: "xnqRV7CuSjHm5VX8"
      }}
    req.on('data',function(data){
      var datas = eval("("+data+")");
      datas['user'] = {
        avatar: {
          avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
          avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
        },
        depts: "",
        id: "xnqRV7CuSjHm5VX8",
        name: "卢红兵",
      }
      _.extend(Backdatas['item'],datas);
    })
    req.on('end',function(){
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    })
    next()
  })
//分享范围的
router.route('/cmri/suggestion/share')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.end(JSON.stringify({code:0,data:{data:_.map(_.range(0,10),function(item){
        return {
            avatar: {
              avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
              avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=s5dOms5sordV8BCr"
            },
            contact: {sina: "weibo.com", qq: "456789098", mobile: "13810316109"},
            mobile: "13810316109",
            qq: "456789098",
            sina: "weibo.com",
            email: "heqiao@chinamobile.com",
            extension_num: "33175",
            id: parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100),
          name: "何娇娇"+parseInt(Math.random(0,100)*100)+'何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇',
            online: "online",
            title: "信息系统与安全管理中心技术经理",
            type: "osns_n_user"
          }
      }),q:'xxxxx'
      },systime:Date.parse(new Date())}));
    next()
  })
  //分享范围的
router.route('/cmri/suggestion/users')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.end(JSON.stringify({code:0,data:{data:_.map(_.range(0,10),function(item){
        return {
            avatar: {
              avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
              avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=s5dOms5sordV8BCr"
            },
            contact: {sina: "weibo.com", qq: "456789098", mobile: "13810316109"},
            mobile: "13810316109",
            qq: "456789098",
            sina: "weibo.com",
            email: "heqiao@chinamobile.com",
            extension_num: "33175",
            id: parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100),
            name: "何娇娇"+parseInt(Math.random(0,100)*100)+'何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇何娇娇',
            online: "online",
            title: "信息系统与安全管理中心技术经理",
            type: "osns_n_user"
          }
      }),q:'xxxxx'
      },systime:Date.parse(new Date())}));
    next()
  })
//项目信息流获取s

router.route('/spms/as/as')
.all(function(req,res,next){next()})
.get(function(req,res,next){
  // 信息流列表的获取
  var Backdatas = {
    page:{},
    info:[]
  };
  var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
  var datasList = datas["data"]["info"];
  var url = req.url.split('?')[1].split('&');
  var urlData = {};
  _.each(url,function(item){
    var splitData = item.split('=');
    urlData[splitData[0]] = splitData['1'];
  })
  if(req.url.indexOf('max_id')>-1){
    Backdatas['page']['num'] = datas['data']['page']['num'];
    Backdatas['page']['pageno'] = 0;
    Backdatas['page']['pagesize'] = 20;
    var index = 0;
    _.each(datasList,function(item,i){
      if(item["id"] == urlData["max_id"]) index = i+1;
    });
    Backdatas['info'] = _.rest(datasList,index);
    Backdatas['info'] = _.first(Backdatas['info'],10)
  }else{
    Backdatas['page']['pageno'] = urlData['pageno'];
    Backdatas['page']['pagesize'] = urlData['pagesize'];
    Backdatas['page']['num'] = datas['data']['page']['num']
    Backdatas['info'] = _.rest(datasList,parseInt(urlData['pageno'])*urlData['pagesize']);
    Backdatas['info'] = _.first(Backdatas['info'],urlData['pagesize']);
  }
  // 单挑信息流的获取
  // var tm=new Date();
  // var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
  // var Backdatas = {}
  // var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
  //     favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
  //       id: "xnqRV7CuSjHm5VX8",
  //       name: "卢红兵",
  //       type: "osns_n_user",
  //       avatar: {
  //         avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
  //         avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
  //       }
  //     },video_flag: "0",view_num: 0}
  // _.extend(Backdatas,serverData);
  //终止
    res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
})
.post(function(req,res,next){
  res.writeHead(200, { 'Content-Type': 'application/json' });
  var tm=new Date();
  var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
  var Backdatas = {}
  req.on('data',function(data){
    var datas = eval("("+data+")");
    datas['id'] = id;
    var DataList = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
    var newData = _.clone(DataList["data"]['info']);
    var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
      favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
        id: "xnqRV7CuSjHm5VX8",
        name: "卢红兵",
        type: "osns_n_user",
        avatar: {
          avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
          avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
        }
      },video_flag: "0",view_num: 0,
      }
    _.extend(serverData,datas);
    //转换
    serverData['attached_info'] = serverData['append'];
    if(serverData["link"]&&serverData["link"] !='') serverData['link_info'][0] = serverData['link'];
    //转换
    newData.unshift(serverData);
    DataList['data']['info'] = newData;
    DataList['data']['page']['num'] = newData.length;
    Backdatas = _.clone(serverData);
    fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(DataList)),function(err){
      if(err) console.log(err)
    })
  })
  req.on('end',function(){
    res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
  })
  next();
})
router.route('/cmri/as/getpublictimeline')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    // 信息流列表的获取
    var Backdatas = {
      page:{},
      info:[]
    };
    var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
    var datasList = datas["data"]["info"];
    var url = req.url.split('?')[1].split('&');
    var urlData = {};
    _.each(url,function(item){
      var splitData = item.split('=');
      urlData[splitData[0]] = splitData['1'];
    })
    if(req.url.indexOf('max_id')>-1){
      Backdatas['page']['num'] = datas['data']['page']['num'];
      Backdatas['page']['pageno'] = 0;
      Backdatas['page']['pagesize'] = 20;
      var index = 0;
      _.each(datasList,function(item,i){
        if(item["id"] == urlData["max_id"]) index = i+1;
      });
      Backdatas['info'] = _.rest(datasList,index);
      Backdatas['info'] = _.first(Backdatas['info'],10)
    }else{
      Backdatas['page']['pageno'] = urlData['pageno'];
      Backdatas['page']['pagesize'] = urlData['pagesize'];
      Backdatas['page']['num'] = datas['data']['page']['num']
      Backdatas['info'] = _.rest(datasList,parseInt(urlData['pageno'])*urlData['pagesize']);
      Backdatas['info'] = _.first(Backdatas['info'],urlData['pagesize']);
    }
    // 单挑信息流的获取
    // var tm=new Date();
    // var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
    // var Backdatas = {}
    // var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
    //     favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
    //       id: "xnqRV7CuSjHm5VX8",
    //       name: "卢红兵",
    //       type: "osns_n_user",
    //       avatar: {
    //         avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
    //         avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
    //       }
    //     },video_flag: "0",view_num: 0}
    // _.extend(Backdatas,serverData);
    //终止
    // setTimeout(function(){
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      next();
    // },10000)
  })
  .post(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var tm=new Date();
    var id=tm.getMilliseconds()+tm.getSeconds()*60+tm.getMinutes()*3600+tm.getHours()*60*3600+tm.getDay()*3600*24+tm.getMonth()*3600*24*31+tm.getYear()*3600*24*31*12
    var Backdatas = {}
    req.on('data',function(data){
      var datas = eval("("+data+")");
      datas['id'] = id;
      var DataList = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
      var newData = _.clone(DataList["data"]['info']);
      var serverData = {app_id: "b1bHMqcnxraW58gd",app_info: {id: "b1bHMqcnxraW58gd", type: "spms_project"},app_type: "spms_project", as_type: "0", associated_oids: [],attached_info: [],client_info: "",client_type: "",comments_ids: [],comments_num: 0,contain_info: [],content: "dsadasdasdasdasdasd",created_at: "1422327984",doc_flag: "0",domain_id: "0SvtS2hJJSvZL0Fa",
        favorite_flag: 0,favorite_num: 0,file_flag: "0",forward_num: 0,geo: "",id:id,image_flag: "0",ip: "",like_flag: 0,like_num: 0,link_flag: "0",link_info:[],mac_addr: "",memo: "",oid: "",original_id: "",plugin_id: "",plugin_type: "0", post_type: "0",reported_num: 0,retweeted_id: "",rich_dynamic_url: "[]",share_oids: [],collect:"false",share_scope: [],share_uids: [],space: "",sys_id: "OSNS",top_flag: 0,uid: "xnqRV7CuSjHm5VX8",user: {
          id: "xnqRV7CuSjHm5VX8",
          name: "卢红兵",
          type: "osns_n_user",
          avatar: {
            avatar_s: "/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            avatar_l: "/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm"
          }
        },video_flag: "0",view_num: 0,
        }
      _.extend(serverData,datas);
      //转换
      serverData['attached_info'] = serverData['append'];
      if(serverData["link"]&&serverData["link"] !='') serverData['link_info'][0] = serverData['link'];
      //转换
      newData.unshift(serverData);
      DataList['data']['info'] = newData;
      DataList['data']['page']['num'] = newData.length;
      Backdatas = _.clone(serverData);
      fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
    })
    req.on('end',function(){
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
    })
    next();
  })
router.route('/spms/as/as/*')
  .all(function(req,res,next){next()})
  .delete(function(req,res,next){
    var url = req.url.split('/')
    var id = url[url.length-1];
    var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
    var datasList = datas["data"]["info"];
    var newData = _.filter(_.clone(datasList),function(item){
      return item['id'] != id;
    })
    datas['data']['info'] = newData;
    datas['data']['page']['num'] = newData.length;

    fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(datas)),function(err){
      if(err) console.log(err)
    })
    res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })
  .patch(function(req,res,next){
    var Backdatas = {};
    req.on('data',function(data){
      var upDatas = eval('('+data+')');
      var datas = eval('('+fs.readFileSync('routers/files/project-as.json')+')');
      var datasList = datas["data"]["info"];
      var nowData = _.filter(datasList,function(item){
        return item["id"] == upDatas['id'];
      })
      nowData = _.extend(nowData[0],upDatas)
      Backdatas = _.extend(Backdatas,nowData);
      fs.writeFile('routers/files/project-as.json',JSON.stringify(_.clone(datas)),function(err){
        if(err) console.log(err)
      })
    })
    req.on('end',function(){
      res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      res.writeHead(200, { 'Content-Type': 'application/json' });
    })
    next()
  })
//获取文件
router.route('/spms/file/upload')
  .all(function(req,res,next){next()})
  .post(function(req,res,next){
     var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      res.end(JSON.stringify({
          allow_download: "1",
          app_id: "",
          app_type: "spms_project",
          append:{
            original:{
              ext_name: "jpg",file_size: 1196009,file_type: "osns_n_image",height: 1800,link: "http://10.2.5.191/file/vieworiginal?id=FfHIdFHxiQDKyVbu",width: 2880
            },
            preview:{
              ext_name: "jpg",file_name: false,file_path: null,file_size: 17565,file_type: "osns_n_image",height: 500,link: "http://10.2.5.191/file/viewpreview?id=FfHIdFHxiQDKyVbu",width: 800
            },
            thumbnails:{
              ext_name: "jpg",file_name: false,file_path: null,file_size: 1978,file_type: "osns_n_image",height: 112,link: "http://10.2.5.191/file/viewthumbnails?id=FfHIdFHxiQDKyVbu",width: 180
            }
          },
          convert_flag: "",created_at: "1425954967",download_num: "",ext_name: "jpg",file_size: "",file_type: "osns_n_image",follow_num: "",height: 1800,html: "",id: "FfHIdFHxiQDKyVbu",link: "http://10.2.5.191/file/download?id=FfHIdFHxiQDKyVbu",linked_num: "",memo: "",post_ip: "10.2.41.32",share_num: "",share_oids: "",share_scope: "",share_uids: "",show_name: "13",tag: "",trans_flag: 0,uid: "xnqRV7CuSjHm5VX8",version_flag: "0",version_num: "0",viewed_num: "",width: 2880
      }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })
//获取链接接口
router.route('/spms/as/url')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({code:0,data:{
      body_data: {
        images:['http://www.baidu.com/img/baidu_jgylogo3.gif',"http://www.baidu.com/img/bd_logo.png"]
      },
      descript: "",
      favicon: "",
      logo: "p",
      title: "百度一下，你就知道",
      url: {id:'xxxxx',url:"http://www.baidu.com"},
      url_type: "osns_link_url"},systime:Date.parse(new Date())}));
    next();
  })

  //项目list列表
  router.route('/spms/console/fields')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-fields.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-fields.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fields.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-fields.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fields.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/fields/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-fields.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-fields.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-fields.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-fields.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-fields.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目list列表
  router.route('/spms/console/fieldsconf')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-fieldsconf.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsconf.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fieldsconf.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsconf.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-fieldsconf.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/fieldsconf/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-fieldsconf.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsconf.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-fieldsconf.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-fieldsconf.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-fieldsconf.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
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


//部门列表
  router.route('/spms/approve/getdeptinfo')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-process-dept.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })


//流程列表
  router.route('/spms/approve/synthesisqueryprocessinfo')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-process-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  //项目list列表
  router.route('/spms/console/projecttype')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-projecttype.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttype.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-projecttype.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttype.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-projecttype.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/projecttype/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-projecttype.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttype.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-projecttype.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-projecttype.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-projecttype.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目list列表
  router.route('/spms/console/projecttypeviewplan')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-projecttypeviewplan.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttypeviewplan.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-projecttypeviewplan.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttypeviewplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-projecttypeviewplan.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/projecttypeviewplan/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-projecttypeviewplan.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-projecttypeviewplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-projecttypeviewplan.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-projecttypeviewplan.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-projecttypeviewplan.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目list列表
  router.route('/spms/role/role')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/consoleRole.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/consoleRole.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/consoleRole.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/consoleRole.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/consoleRole.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/fields/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/consoleRole.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/consoleRole.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/consoleRole.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/consoleRole.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/consoleRole.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目list列表
  router.route('/spms/console/view')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-view.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-view.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-view.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-view.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-view.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/view/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-view.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-view.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-view.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-view.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-view.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
  //项目list列表
  router.route('/spms/console/viewplan')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/console-viewplan.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
    .post(function(req, res, next){
      var id = parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100)+''+parseInt(Math.random(0,100)*100);
      var Backdatas = {}
      req.on('data',function(data){
        var datas = eval("("+data+")");
        datas['id'] = id;
        var DataList = eval('('+fs.readFileSync('routers/files/console-viewplan.json')+')');
        var newData = _.clone(DataList["data"]['list']);
        newData.unshift(datas);
        DataList['data']['list'] = newData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-viewplan.json',JSON.stringify(_.clone(DataList)),function(err){
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-viewplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas)
        fs.writeFile('routers/files/console-viewplan.json',JSON.stringify(_.clone(DataList)),function(err){
          if(err) console.log(err)
        })
      })
      req.on('end',function(data){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({code:0,data:Backdatas,systime:Date.parse(new Date())}));
      })
    })
  //项目单条编辑
  router.route('/spms/console/viewplan/:id')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/console-viewplan.json');
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
        var DataList = eval('('+fs.readFileSync('routers/files/console-viewplan.json')+')');
        var nowData  = _.clone(DataList['data']['list']);
        _.each(nowData,function(item){
          if(item["id"] == datas["id"]){
            _.extend(item,datas)
          }
        })
        DataList['data']['list'] = nowData
        Backdatas = _.clone(datas);
        fs.writeFile('routers/files/console-viewplan.json',JSON.stringify(_.clone(DataList)),function(err){
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
      var DataList = eval('('+fs.readFileSync('routers/files/console-viewplan.json')+')');
      var nowData  = _.clone(DataList['data']['list']);
      nowData = _.filter(nowData,function(item){
        return item['id']!=id
      });
      DataList['data']['list'] = nowData
      fs.writeFile('routers/files/console-viewplan.json',JSON.stringify(_.clone(DataList)),function(err){
        if(err) console.log(err)
      })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({code:0,data:{true:1},systime:Date.parse(new Date())}));
      next()
    })
// /dashboard/config
router.route('/spms/dashboard')
	.all(function(req,res,next){next()})
	.get(function(req,res,next){
		var data = {
      banner:[
        {img:'http://slidesjs.com/img/example-slide-350-1.jpg'},
        {img:'http://slidesjs.com/img/example-slide-350-2.jpg'},
        {img:'http://slidesjs.com/img/example-slide-350-3.jpg'},
        {img:'http://slidesjs.com/img/example-slide-350-4.jpg'}
      ],
      dashboard:[
        {type:'todo',title:'待办事项',viewType:'l',moduleName:''},
        {type:'as',title:'资讯',viewType:'l',moduleName:'As'},
        {data:[
            {
              type:'apps',title:'应用',viewType:'r',moduleName:'MoreApps'
            },
            {
              type:'addressbook',title:'通讯录',viewType:'r',moduleName:'Addressbook'
            },
            {
              type:'placard',title:'公告',viewType:'r',moduleName:'Placard'
            }
          ]
        }
      ]
    }
		res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
		next();
	})

router.route('/spms/dashboard/moreapps')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = [
      {
        data:[
          {name:'任务督办',url:'xxxxxx',ico:'',type:'task'},
          {name:'项目管理',url:'xxxxxx',ico:'',type:'project'},
          {name:'报功系统',url:'xxxxxx',ico:'',type:'report'},
          {name:'HR督办',url:'xxxxxx',ico:'',type:'check'}
        ],
        type:'allways'
      },
      {
        data:[
          {name:'任务督办',url:'xxxxxx',ico:'',type:'task'},
          {name:'项目管理',url:'xxxxxx',ico:'',type:'project'},
          {name:'报功系统',url:'xxxxxx',ico:'',type:'report'},
          {name:'HR督办',url:'xxxxxx',ico:'',type:'check'}
        ],
        type:'recommend'
      }
    ]
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })

router.route('/spms/dashboard/addressbook')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = {
      page:{},
      users:[]
    }
    var datas = eval('('+fs.readFileSync('routers/files/addressbook.json')+')');
    var datasList = datas["data"]["users"];
    var url = req.url.split('?')[1].split('&');
    var urlData = {};
    _.each(url,function(item){
      var splitData = item.split('=');
      urlData[splitData[0]] = splitData['1'];
    })
    data['page']['pageno'] = urlData['pageno'];
    data['page']['pagesize'] = urlData['pagesize'];
    data['page']['num'] = datasList.length;
    data['users'] = _.rest(datasList,parseInt(urlData['pageno'])*urlData['pagesize']);
    data['users'] = _.first(data['users'],urlData['pagesize']);  
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })

router.route('/spms/dashboard/placard')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = [
      {department:'中国移动研究院综合部',content:'对于因公临时出国（境）团需要向公司提出申请去玩的，后面没有内容了',date:1428463590},
      {department:'中国移动研究院综合部',content:'公告：临时会议通知',date:1428463590},
      {department:'中国移动研究院综合部',content:'对于因公临时出国（境）团需要向公司提出申请去玩的，后面没有内容了',date:1428463590},
    ]
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })
router.route('/spms/files/')
	.all(function(req,res,next){next()})
	.get(function(req,res,next){
		var data = {
			files:[
        {
          allow_download: "1",
          app_id: "",
          app_type: "osns_app_as",
          append: {
            original: {ext_name: "jpg",file_size: 499573,file_type: "jw_n_image",height: 1481,link: "http://dogesoft.joywok.com/file/vieworiginal?id=NNpBLpd8DG8H3JCn",width: 1000},
            preview: {ext_name: "jpg",file_size: 737310,file_type: "jw_n_image",height: 1184,link: "http://dogesoft.joywok.com/file/viewpreview?id=NNpBLpd8DG8H3JCn",width: 800},
            thumbnails: {ext_name: "jpg",file_size: 51585,file_type: "jw_n_image",height: 266,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=NNpBLpd8DG8H3JCn",width: 180}
          },
          exif:{
            COMPUTED:{
              Height: 1481,
              IsColor: 1,
              Width: 1000,
              html: "width=1000=1481",
            },
            FileDateTime: 1424999802,FileName: "iHCYljQl1W9AbHcg.jpg",FileSize: 107871,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          convert_flag: "",
          created_at: "1423206073",
          download_num: "",
          ext_name: "jpg",
          file_size: "62068",
          file_type: "osns_n_image",
          follow_num: "",
          height: 367,
          html: "",
          id: "R8aGOOQOBUX3RrCI",
          link: "http://dogesoft.joywok.com/file/download?id=K85aEgDrl500x4Pp",
          linked_num: "",
          memo: "",
          post_ip: "10.2.41.48",
          share_num: "",
          share_oids: "",
          share_scope: "",
          share_uids: "",
          show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
          tag: "",
          trans_flag: 0,
          uid: "xnqRV7CuSjHm5VX8",
          version_flag: "0",
          version_num: "0",
          viewed_num: "",
          comment_num:'',
          width: 1024,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          },
          name:'xxx.zip'
        },
        {
          allow_download: "1",
          app_id: "",
          app_type: "osns_app_as",
          append: {
            original: {ext_name: "jpg",file_size: 107871,file_type: "jw_n_image",height: 115,link: "http://dogesoft.joywok.com/file/vieworiginal?id=iHCYljQl1W9AbHcg",width: 1024},
            preview: {ext_name: "jpg",file_size: 51356,file_type: "jw_n_image",height: 89,link: "http://dogesoft.joywok.com/file/viewpreview?id=iHCYljQl1W9AbHcg",width: 800},
            thumbnails: {ext_name: "jpg",file_size: 4768,file_type: "jw_n_image",height: 20,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=iHCYljQl1W9AbHcg",width: 180}
          },
          exif:{
            COMPUTED:{
              Height: 115,
              IsColor: 1,
              Width: 1024,
              html: "width=1024=115",
            },
            FileDateTime: 1424999802,FileName: "iHCYljQl1W9AbHcg.jpg",FileSize: 107871,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          convert_flag: "",
          created_at: "1423206073",
          download_num: "",
          ext_name: "jpg",
          file_size: "62068",
          file_type: "osns_n_image",
          follow_num: "",
          height: 367,
          html: "",
          id: "iHCYljQl1W9AbHcg",
          link: "http://dogesoft.joywok.com/file/download?id=K85aEgDrl500x4Pp",
          linked_num: "",
          memo: "",
          post_ip: "10.2.41.48",
          share_num: "",
          share_oids: "",
          share_scope: "",
          share_uids: "",
          show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
          tag: "",
          trans_flag: 0,
          uid: "xnqRV7CuSjHm5VX8",
          version_flag: "0",
          version_num: "0",
          viewed_num: "",
          comment_num:'',
          width: 1024,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          }
        },
				{
          allow_download: "1",
          app_id: "",
          app_type: "osns_app_as",
          append: {
            original: {ext_name: "jpg",file_size: 1322536,file_type: "jw_n_image",height: 10623,link: "http://dogesoft.joywok.com/file/vieworiginal?id=9o1ySSp46rJIfnEn",width: 440},
            preview: {ext_name: "jpg",file_size: 2009290,file_type: "jw_n_image",height: 10623,link: "http://dogesoft.joywok.com/file/viewpreview?id=9o1ySSp46rJIfnEn",width: 440},
            thumbnails: {ext_name: "jpg",file_size: 511328,file_type: "jw_n_image",height: 4345,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=9o1ySSp46rJIfnEn",width: 180}
          },
          exif:{
          	COMPUTED:{
          		Height: 10623,
							IsColor: 1,
							Width: 440,
							html: "width=350height=350",
          	},
          	FileDateTime: 1424998031,FileName: "9o1ySSp46rJIfnEn.jpg",FileSize: 1322536,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          convert_flag: "",
          created_at: "1423206073",
          download_num: "",
          ext_name: "jpg",
          file_size: "62068",
          file_type: "osns_n_image",
          follow_num: "",
          height: 367,
          html: "",
          id: "9o1ySSp46rJIfnEn",
          link: "http://dogesoft.joywok.com/file/download?id=K85aEgDrl500x4Pp",
          linked_num: "",
          memo: "",
          post_ip: "10.2.41.48",
          share_num: "",
          share_oids: "",
          share_scope: "",
          share_uids: "",
          show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
          tag: "",
          trans_flag: 0,
          uid: "xnqRV7CuSjHm5VX8",
          version_flag: "0",
          version_num: "0",
          viewed_num: "",
          comment_num:'',
          width: 440,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          }
        },
				{
          allow_download: "1",
          app_id: "",
          app_type: "osns_app_as",
          append: {
            original: {ext_name: "jpg",file_size: 79921,file_type: "jw_n_image",height: 720,link: "http://dogesoft.joywok.com/file/vieworiginal?id=K85aEgDrl500x4Pp",width: 640},
            preview: {ext_name: "jpg",file_size: 174750,file_type: "jw_n_image",height: 720,link: "http://dogesoft.joywok.com/file/viewpreview?id=K85aEgDrl500x4Pp",width: 640},
            thumbnails: {ext_name: "jpg",file_size: 26233,file_type: "jw_n_image",height: 202,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=K85aEgDrl500x4Pp",width: 180}
          },
          exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          convert_flag: "",
          created_at: "1423206073",
          download_num: "",
          ext_name: "jpg",
          file_size: "62068",
          file_type: "osns_n_image",
          follow_num: "",
          height: 367,
          html: "",
          id: "mjUSEU90rODPdp3f",
          link: "http://dogesoft.joywok.com/file/download?id=K85aEgDrl500x4Pp",
          linked_num: "",
          memo: "",
          post_ip: "10.2.41.48",
          share_num: "",
          share_oids: "",
          share_scope: "",
          share_uids: "",
          show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
          tag: "",
          trans_flag: 0,
          uid: "xnqRV7CuSjHm5VX8",
          version_flag: "0",
          version_num: "0",
          viewed_num: "",
          comment_num:'',
          width: 550,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          }
        },
        {
          app_id: "ymWx7pYr2k0WJPCq",
          app_type: "jw_app_as",
          append: {
            original:{
              ext_name: "jpg",file_size: 15629,file_type: "jw_n_image",height: 1123,link: "http://docview.joywok.com/file/vieworiginal?id=tJYSsLo69LPW58T3",width: 794
            },
            preview:{
              ext_name: "jpg",file_size: 49344,file_type: "jw_n_image",height: 1123,link: "http://docview.joywok.com/file/viewpreview?id=tJYSsLo69LPW58T3",width: 794
            },
            thumbnails:{
              ext_name: "jpg",file_size: 3790,file_type: "jw_n_image",height: 254,link: "http://docview.joywok.com/file/viewthumbnails?id=tJYSsLo69LPW58T3",width: 180
            }
          },
          exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          comment_num: 0,
          comments_ids: "[]",
          convert_flag: "",
          created_at: "1422951954",
          download_num: "2",
          ext_name: "pptx",
          file_size: "211809",
          file_type: "jw_n_doc",
          folder_id: "",
          follow_flag: 0,
          follow_num: "",
          host_id: "0CQMz7T2A58Z6K1E",
          html: '<iframe src="http://docview.joywok.com/p/PowerPointFrame.aspx?PowerPointView=ReadingView&WOPISrc=http%3A%2F%2F10.0.1.64%2Fapi2%2Fwopi%2Ffiles%2FFhUmxbXGhWADJ3Cp&access_token=kqvgovsqt0f4lsitc05ocrq7i3&time=0.4700329164043069" frameborder="0"></iframe>',
          id: "0CQMz7T2A58Z6K1E",
          intro: [],
          link: "http://docview.joywok.com/file/download?id=tJYSsLo69LPW58T3",
          linked_num: "",
          memo: "",
          owner_id: "z1wmchgtddktqn7b",
          parent_id: "",
          post_ip: "192.168.1.115",
          public_folder: 0,
          share_num: "",
          share_oids: "",
          share_scope: "public",
          share_uids: "[]",
          show_name: "PMS-New",
          tag: "",
          trans_flag: "1",
          uid: "z1wmchgtddktqn7b",
          version_flag: "0",
          version_num: "1",
          viewed_num: 9,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm"
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          }
        },
				{
					allow_download: "1",
					app_id: "",
					exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
					app_type: "osns_app_as",
					convert_flag: "",
					created_at: "1422949878",
					comment_num:'',
					download_num: "",
					ext_name: "jpg",
					file_size: "879394",
					file_type: "osns_n_image",
					follow_flag: 1,
					follow_num: "1",
					height: 768,
					html: "",
					id: "c5ERtlMPalNq2dHn",
					link: "http://dogesoft.joywok.com/file/download?id=QHHoRWYgZ6k3Ku42",
					linked_num: "",
					memo: "",
					post_ip: "10.2.41.32",
					share_num: "",
					share_oids: "[]",
					share_scope: "public",
					share_uids: "[]",
					show_name: "Chrysanthemum",
					tag: "",
					trans_flag: 0,
					uid: "xnqRV7CuSjHm5VX8",
					version_flag: "0",
					version_num: "1",
					viewed_num: "3",
					width: 1024,
					append:{
			            original:{
                      ext_name: "jpg",
											file_size: 46094,
											file_type: "jw_n_image",
											height: 338,
											link: "http://dogesoft.joywok.com/file/vieworiginal?id=QHHoRWYgZ6k3Ku42",
											width: 500
			            },
			            preview:{
                    ext_name: "jpg",
										file_size: 81549,
										file_type: "jw_n_image",
										height: 338,
										link: "http://dogesoft.joywok.com/file/viewpreview?id=QHHoRWYgZ6k3Ku42",
										width: 500
			            },
			            thumbnails:{
                    ext_name: "jpg",
										file_size: 18734,
										file_type: "jw_n_image",
										height: 121,
										link: "http://dogesoft.joywok.com/file/viewthumbnails?id=QHHoRWYgZ6k3Ku42",
										width: 180
			            }
			        },
			        user:{
			        	activity_role: "5",
						actrole: [],
						avatar: {
							avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
							avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
						},
						email: "luhongbing@chinamobile.com",
						id: "xnqRV7CuSjHm5VX8",
						name: "卢红兵",
						url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
			        }
				},
				{
					allow_download: "1",
					app_id: "",
					app_type: "osns_app_as",
					append: {
						original: {ext_name: "jpg",file_size: 62068,file_type: "jw_n_image",height: 367,link: "http://dogesoft.joywok.com/file/vieworiginal?id=vzx8TO5UdThROxQC",width: 550},
						preview: {ext_name: "jpg",file_size: 95398,file_type: "jw_n_image",height: 367,link: "http://dogesoft.joywok.com/file/viewpreview?id=vzx8TO5UdThROxQC",width: 550},
						thumbnails: {ext_name: "jpg",file_size: 20809,file_type: "jw_n_image",height: 120,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=vzx8TO5UdThROxQC",width: 180}
					},
					exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
					convert_flag: "",
					created_at: "1423206072",
					download_num: "",
					comment_num:'',
					ext_name: "jpg",
					file_size: "46094",
					file_type: "osns_n_image",
					follow_num: "",
					height: 338,
					html: "",
					id: "Zn7geRm86Kthjyow",
					link: "http://dogesoft.joywok.com/file/download?id=vzx8TO5UdThROxQC",
					linked_num: "",
					memo: "",
					post_ip: "10.2.41.48",
					share_num: "",
					share_oids: "",
					share_scope: "",
					share_uids: "",
					show_name: "W020130607567989376089",
					tag: "",
					trans_flag: 0,
					uid: "xnqRV7CuSjHm5VX8",
					version_flag: "0",
					version_num: "0",
					viewed_num: "",
					width: 500,
					user:{
			        	activity_role: "5",
						actrole: [],
						avatar: {
							avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
							avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
						},
						email: "luhongbing@chinamobile.com",
						id: "xnqRV7CuSjHm5VX8",
						name: "卢红兵",
						url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
			        }
				},
				{
					allow_download: "1",
					app_id: "",
					app_type: "osns_app_as",
					append: {
						original: {ext_name: "jpg",file_size: 32922,file_type: "jw_n_image",height: 375,link: "http://dogesoft.joywok.com/file/vieworiginal?id=aWmZTvyzynf5EH8J",width: 500},
						preview: {ext_name: "jpg",file_size: 59764,file_type: "jw_n_image",height: 375,link: "http://dogesoft.joywok.com/file/viewpreview?id=aWmZTvyzynf5EH8J",width: 500},
						thumbnails: {ext_name: "jpg",file_size: 13848,file_type: "jw_n_image",height: 135,link: "http://dogesoft.joywok.com/file/viewthumbnails?id=aWmZTvyzynf5EH8J",width: 180}
					},
					exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
					convert_flag: "",
					created_at: "1423206073",
					download_num: "",
					ext_name: "jpg",
					comment_num:'',
					file_size: "62068",
					file_type: "osns_n_image",
					follow_num: "",
					height: 367,
					html: "",
					id: "WjL4AswYGhBcUwMt",
					link:  "http://dogesoft.joywok.com/file/download?id=aWmZTvyzynf5EH8J",
					linked_num: "",
					memo: "",
					post_ip: "10.2.41.48",
					share_num: "",
					share_oids: "",
					share_scope: "",
					share_uids: "",
					show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
					tag: "",
					trans_flag: 0,
					uid: "xnqRV7CuSjHm5VX8",
					version_flag: "0",
					version_num: "0",
					viewed_num: "",
					width: 550,
					user:{
			        	activity_role: "5",
						actrole: [],
						avatar: {
							avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
							avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
						},
						email: "luhongbing@chinamobile.com",
						id: "xnqRV7CuSjHm5VX8",
						name: "卢红兵",
						url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
			        }
				},
        {
          allow_download: "1",
          app_id: "",
          app_type: "osns_app_as",
          append: {
            original: {ext_name: "jpg",file_size: 102727,file_type: "jw_n_image",height: 960,link: "http://gbin1.com/gb/networks/uploads/3c6bf466-9284-45c2-a83e-b6ad3325827d/images/GreenMonster_1280px.jpg",width: 1280},
            preview: {ext_name: "jpg",file_size: 144894,file_type: "jw_n_image",height: 480,link: "http://gbin1.com/gb/networks/uploads/3c6bf466-9284-45c2-a83e-b6ad3325827d/images/GreenMonster_640px.jpg",width: 640},
            thumbnails: {ext_name: "jpg",file_size: 22215,file_type: "jw_n_image",height: 480,link: "http://gbin1.com/gb/networks/uploads/3c6bf466-9284-45c2-a83e-b6ad3325827d/images/GreenMonster_640px.jpg",width: 640}
          },
          exif:{
          	COMPUTED:{
          		Height: 350,
							IsColor: 1,
							Width: 350,
							html: "width=350height=350",
          	},
          	FileDateTime: 1423450701,FileName: "HaCZqgVtcyuqcjVO.jpg",FileSize: 77589,FileType: 2,MimeType: "image/jpeg",SectionsFound: ""
          },
          convert_flag: "",
          created_at: "1423206073",
          download_num: "",
          ext_name: "jpg",
          file_size: "62068",
          file_type: "osns_n_image",
          follow_num: "",
          comment_num:'',
          height: 367,
          html: "",
          id: "i8CIJUqwnIHf2WHQ",
          link: "http://dogesoft.joywok.com/file/download?id=yTfskjgYFYMsXFT2",
          linked_num: "",
          memo: "",
          post_ip: "10.2.41.48",
          share_num: "",
          share_oids: "",
          share_scope: "",
          share_uids: "",
          show_name: "news_default_AAC654C523129198238ADB4F131F04F5",
          tag: "",
          trans_flag: 0,
          uid: "xnqRV7CuSjHm5VX8",
          version_flag: "0",
          version_num: "0",
          viewed_num: "",
          width: 550,
          user:{
            activity_role: "5",
            actrole: [],
            avatar: {
              avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
              avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
            },
            email: "luhongbing@chinamobile.com",
            id: "xnqRV7CuSjHm5VX8",
            name: "卢红兵",
            url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
          }
        }
			],
			info:{
				app_id: "MhbO82ZRfh5pz0L2",
				app_info: [],
				app_type: "osns_app_as",
				as_type: "0",
				associated_oids: [],
				at_uids: "",
				client_info: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36",
				client_type: "Windows",
				comments_ids: [],
				comments_num: 0,
				contain_info: [],
				content: "打算",
				created_at: "1422949879",
				dm_uids: "",
				doc_flag: "0",
				domain_id: "0SvtS2hJJSvZL0Fa",
				dynamic_type: "",
				favorite_num: 0,
				file_flag: "0",
				forward_num: 0,
				id: "MhbO82ZRfh5pz0L2",
				image_flag: "1",
				ip: "10.2.41.32",
				like_num: 0,
				link_flag: "0",
				link_info: [],
				mac_addr: "",
				memo: "",
				oid: "",
				original_id: "",
				plugin_id: "",
				plugin_type: "0",
				pm_uids: "",
				post_type: "0",
				reported_num: 0,
				retweeted_id: "",
				rich_dynamic_url: "[]",
				share_oids: [],
				share_scope: "public",
				share_uids: [],
				sys_id: "OSNS",
				uid: "xnqRV7CuSjHm5VX8",
				video_flag: "0",
				view_num: 0,
				user:{
		        	activity_role: "5",
					actrole: [],
					avatar: {
						avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
						avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm",
					},
					email: "luhongbing@chinamobile.com",
					id: "xnqRV7CuSjHm5VX8",
					name: "卢红兵",
					url: "http://10.2.5.191/profile?id=xnqRV7CuSjHm5VX8"
		        },
		        attached_info:[
		        	{
		        		file_size: "879394",
						file_type: "jpg",
						height: 768,
						id: "c5ERtlMPalNq2dHn",
						image: {
							original: "http://10.2.5.191/file/vieworiginal?id=c5ERtlMPalNq2dHn",
							preview: "http://10.2.5.191/file/viewpreview?id=c5ERtlMPalNq2dHn",
							thumbnails: "http://10.2.5.191/file/viewthumbnails?id=c5ERtlMPalNq2dHn"
						},
						name: "Chrysanthemum",
						type: "osns_n_image",
						user: {uid: "xnqRV7CuSjHm5VX8", name: "卢红兵", type: "osns_n_user",avatar:{
							avatar_l: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=large&id=am5rkTAdbK3v9TOm",
							avatar_s: "http://10.2.5.191/openfile/getfile?type=osns_n_avatar&size=small&id=am5rkTAdbK3v9TOm"
						}},
						width: 1024
		        	}
		        ]
			},
			type: "osns_n_as"
		}
		res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
		next();
	})

router.route('/spms/project/holiday')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = {"list":["20150104","20150110","20150111","20150117","20150118","20150124","20150125","20150131","20150201","20150207","20150208","20150214","20150215","20150221","20150222","20150228","20150301","20150307","20150308","20150314","20150315","20150321","20150322","20150323","20150324","20150325","20150328","20150329","20150404","20150405","20150411","20150412","20150418","20150419","20150425","20150426","20150502","20150503","20150509","20150510","20150516","20150517","20150523","20150524","20150530","20150531","20150606","20150607","20150608","20150609","20150613","20150614","20150621","20150627","20150628","20150704","20150705","20150711","20150712","20150718","20150719","20150725","20150726","20150801","20150802","20150808","20150809","20150815","20150816","20150822","20150823","20150829","20150830","20150905","20150906","20150912","20150913","20150919","20150920","20150926","20151010","20151011","20151017","20151018","20151024","20151025","20151031","20151101","20151107","20151108","20151114","20151115","20151121","20151122","20151128","20151129","20151205","20151206","20151212","20151213","20151219","20151220","20151226","20151227"]};
      res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
      next()
    })
router.route('/spms/project/holidayjs')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/javascript' });

      res.end('var holidays=["20150613","20150614","20150620","20150621","20150622","20150627","20150628","20150704","20150705","20150711","20150712","20150718","20150719","20150725","20150726","20150801","20150802","20150808","20150809","20150815","20150816","20150822","20150823","20150829","20150830","20150905","20150906","20150912","20150913","20150919","20150920","20150926","20150927","20151001","20151002","20151003","20151004","20151005","20151006","20151007","20151010","20151011","20151017","20151018","20151024","20151025","20151031","20151101","20151107","20151108","20151114","20151115","20151121","20151122","20151128","20151129","20151205","20151206","20151212","20151213","20151219","20151220","20151226","20151227"];');

      next()
    })
// 获取报工信息（day／week）
router.route('/spms/jobcard/list')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-list.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 获取创建人所有项目，子项目以及成果
router.route('/spms/jobcard/targets')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-targets.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 单条报工
router.route('/spms/jobcard/')
  .all(function(req, res, next){
    next();
  })
  // 获取单条报工
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['get']));
    next();
  })
  // 添加单条报工
  .post(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['post']['result']));
    next();
  })
  // 更新单条报工
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['put']['result']));
    next();
  })
  // 删除单条报工
  .delete(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-single.json');
    res.end(JSON.stringify(eval("("+data+")")['delete']['delete']));
    next();
  })

// 复制一天报工信息
router.route('/spms/jobcard/copy?copyday=:copyday&newday=:newday')
  .all(function(req, res, next){
    next();
  })
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/jobcard-copy.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });


// 里程碑展示列表
  router.route('spms/milestone/milestone')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/milestone-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  //读取流程
    router.route('/spms/milestone/milestone/:id')
      .all(function(req,res,next){
        next();
      })
      .get(function(req,res,next){
        var url = req.url.split('/');
        var id = url[url.length-1];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var data = fs.readFileSync('routers/files/milestone-detail.json');
        res.end(JSON.stringify(eval("("+data+")")));
        next();
      })
  //个人项目工时list列表
  router.route('/spms/personaljobcard')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/personal-jobcard.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

//里程碑列表
router.route('/spms/plantask/relevanceproject/:id')
  .all(function(req,res,next){
    next();
  })
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/project-subprojects.json');
    // res.end(JSON.stringify(eval("("+data+")")));
    res.end(JSON.stringify({code:0,data:{list:eval("("+data+")")},systime:Date.parse(new Date())}));
    next();
  })

router.route('/spms/plantask/plantask/:id')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = {"id": "c8cd05d9-9e36-ee17-c3d3-fa55a3ce78da",
      "item": {
        "id": "c8cd05d9-9e36-ee17-c3d3-fa55a3ce78da",
        "published":2,
        "plantask": [
          {
            "id": "b74dfda7da2fdffad572209a58e5d95e",
            "name": "test 1",
            "pid": "",
            "parent_id": "",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "plan",
            "status": 1,
            "subproject_id": "",
            "level": 1,
            "descript": "",
            "duration": 1,
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": "0",
            "tags": "",
            "outcomes": [],
            "limit_type": 0,
            "limit_time": "",
            "plan_start_time": 1441036800,
            "plan_end_time": 1441123199,
            "created_at": 1441089240,
            "achievements": [],
            "updated_at": 1442989689,
            "assigness": [
              {
                "id": "xnqRV7CuSjHm5VX8",
                "name": "卢红兵",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=Pq4pFCGdrnPWX8qt",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=Pq4pFCGdrnPWX8qt"
                },
                "status": "0",
                "email": "luhongbing@chinamobile.com"
              }
            ],
            "workload": "1"
          },
          {
            "id": "cc91bc8e114b241aa3ee8e32f2952124",
            "name": "test 1.1",
            "pid": "",
            "parent_id": "b74dfda7da2fdffad572209a58e5d95e",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "plan",
            "status": 1,
            "subproject_id": "",
            "level": 1,
            "descript": "",
            "duration": 1,
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": "0",
            "tags": "",
            "outcomes": [],
            "limit_type": 0,
            "limit_time": "",
            "plan_start_time": 1441036800,
            "plan_end_time": 1441123199,
            "created_at": 1441089264,
            "achievements": [],
            "updated_at": 1442989689,
            "assigness": [
              {
                "id": "zMxWRWa7aHNGXeRz",
                "name": "何乔",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=s5dOms5sordV8BCr"
                },
                "status": "0",
                "email": "heqiao@chinamobile.com"
              },
              {
                "id": "xnqRV7CuSjHm5VX8",
                "name": "卢红兵",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=Pq4pFCGdrnPWX8qt",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=Pq4pFCGdrnPWX8qt"
                },
                "status": "0",
                "email": "luhongbing@chinamobile.com"
              }
            ],
            "workload": "2"
          },
          {
            "id": "e0a064ae1490519344d214ad4345cb56",
            "name": "test 1.1.1",
            "pid": "",
            "parent_id": "cc91bc8e114b241aa3ee8e32f2952124",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "plan",
            "status": 1,
            "subproject_id": "",
            "level": 2,
            "descript": "",
            "duration": 1,
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": "0",
            "tags": "",
            "outcomes": [],
            "limit_type": 0,
            "limit_time": "",
            "plan_start_time": 1441036800,
            "plan_end_time": 1441123199,
            "created_at": 1441089289,
            "achievements": [],
            "updated_at": 1442989689,
            "assigness": [
              {
                "id": "xnqRV7CuSjHm5VX8",
                "name": "卢红兵",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=Pq4pFCGdrnPWX8qt",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=Pq4pFCGdrnPWX8qt"
                },
                "status": "0",
                "email": "luhongbing@chinamobile.com"
              }
            ],
            "workload": "0"
          },
          {
            "id": "05b1174ccc395ce60703eed9f92b142f",
            "name": "测试子项目参与进度计算二",
            "pid": "",
            "parent_id": "cc91bc8e114b241aa3ee8e32f2952124",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "sub_project",
            "status": 1,
            "subproject_id": "2iKhvb3p3AqET5Yh",
            "level": 2,
            "descript": "",
            "duration": "2",
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": "20",
            "tags": "",
            "outcomes": [],
            "limit_type": 0,
            "limit_time": "",
            "plan_start_time": 1445248290,
            "plan_end_time": 1445334690,
            "created_at": 1445248516,
            "achievements": [],
            "updated_at": 1445248516,
            "assigness": [
              {
                "id": "xnqRV7CuSjHm5VX8",
                "name": "卢红兵",
                "avatar": "/openfile/getfile?type=osns_n_avatar&size=large&id=Pq4pFCGdrnPWX8qt",
                "title": "IT架构师",
                "status": "0",
                "email": "luhongbing@chinamobile.com"
              }
            ],
            "workload": "30"
          },
          {
            "id": "43b9e886a03594be09b75f8ee5b0ebe9",
            "name": "Milestone 1",
            "pid": "",
            "parent_id": "",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "milestone",
            "status": 1,
            "subproject_id": "",
            "level": 0,
            "descript": "",
            "duration": 1,
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": 0,
            "tags": "",
            "outcomes": [],
            "limit_type": "0",
            "limit_time": 1442937600,
            "plan_start_time": 1442937600,
            "plan_end_time": 1443023999,
            "created_at": 1442989689,
            "achievements": [],
            "updated_at": 1442989689,
            "assigness": [
              {
                "id": "zMxWRWa7aHNGXeRz",
                "name": "何乔",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=s5dOms5sordV8BCr"
                },
                "status": "0",
                "email": "heqiao@chinamobile.com"
              }
            ]
          },
          {
            "id": "f2f2a4ea1b62bd7b1462c23d29d1533e",
            "name": "Milestone 2",
            "pid": "",
            "parent_id": "",
            "creator_id": "xnqRV7CuSjHm5VX8",
            "category": "milestone_2",
            "status": 1,
            "subproject_id": "",
            "level": 0,
            "descript": "",
            "duration": 1,
            "durationunit": "workday",
            "pre_taskplan": [],
            "process_type": "fixed_duration",
            "progress": 0,
            "tags": "",
            "outcomes": [],
            "limit_type": 0,
            "limit_time": "",
            "plan_start_time": 1442937600,
            "plan_end_time": 1443023999,
            "created_at": 1442989689,
            "achievements": [],
            "updated_at": 1442989689,
            "assigness": [
              {
                "id": "xnqRV7CuSjHm5VX8",
                "name": "卢红兵",
                "avatar": {
                  "avatar_l": "/openfile/getfile?type=osns_n_avatar&size=large&id=Pq4pFCGdrnPWX8qt",
                  "avatar_s": "/openfile/getfile?type=osns_n_avatar&size=small&id=Pq4pFCGdrnPWX8qt"
                },
                "status": "0",
                "email": "luhongbing@chinamobile.com"
              }
            ]
          }
        ],
        "editedVersion": true,
        "code": "G5pCijLFLqIkyl5Y",
        "name": "计划任务测试 - By Marlin",
        "type": "10005",
        "creator_id": "xnqRV7CuSjHm5VX8",
        "parent_id": "",
        "space": "10000",
        "public_scope": "1",
        "lead_dept": "5UHFY0HvGCrLRcWm",
        "assist_depts": "FViKFrEjRB4oZl6O",
        "create_time": "1436254863",
        "update_time": "1436255124",
        "plan_start_time": "1436254790",
        "plan_end_time": "1443024000",
        "real_start_time": "1436255124",
        "real_end_time": null,
        "status": "3",
        "target": "Thirty Seconds To Mars",
        "comments": "",
        "total_labor_budget": "5000000.000000",
        "total_fund_budget": "8888888.000000",
        "tags": null,
        "extinfo": "",
        "islocked": "0",
        "level": "0",
        "del_flg": "0",
        "managers": [
          {
            "id": "xnqRV7CuSjHm5VX8",
            "name": "卢红兵",
            "avatar": "/openfile/getfile?type=osns_n_avatar&size=large&id=C5wBT3BOpWaoSvze",
            "title": "IT架构师",
            "status": "0"
          }
        ],
        "members": [
          {
            "id": "zMxWRWa7aHNGXeRz",
            "name": "何乔",
            "avatar": "/openfile/getfile?type=osns_n_avatar&size=large&id=s5dOms5sordV8BCr",
            "title": "信息系统与安全管理中心技术经理",
            "status": "0"
          },
          {
            "id": "E6kXZGXMLCnuOf35",
            "name": "常江",
            "avatar": "/openfile/getfile?type=osns_n_avatar&size=large&id=wtxubYTwgCy5LhB4",
            "title": "IT架构师",
            "status": "1"
          },
          {
            "id": "EuVm18ipXGG8QWoe",
            "name": "刘旭东",
            "avatar": "/openfile/getfile?type=osns_n_avatar&size=large&id=ovSXBjffDNfXNDWm",
            "title": "职员",
            "status": "0"
          },
          {
            "id": "zOuxEOunfdneVY9q",
            "name": "刘旭（研究院）",
            "avatar": "/public/images/avatar/l.jpg",
            "title": "",
            "status": "0"
          },
          {
            "id": "pT9pZiVSZXu5uYjY",
            "name": "侯志强",
            "avatar": "/public/images/avatar/l.jpg",
            "title": "所长助理",
            "status": "0"
          }
        ],
        "achievements": [],
        "action": "publish",
        "status": "3",
        "islocked": 2
      }
    };
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    next();
  })
  .put(function(req,res,next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({code:0,data:{},systime:Date.parse(new Date())}));
    next()
  })

  // 计划展示列表
  router.route('/spms/plantask/plan')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/plantask-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  // 计划版本列表
  router.route('/spms/plantask/version')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/plantask-version-list.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

router.route('/spms/project/projectsssss')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

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



    










//流程列表 待办
  router.route('/spms/approve/getProcessListBySearch')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-todo.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

//流程列表 待阅
  router.route('/spms/approve/getstayreadlist')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-toread.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

  //流程列表 已办
  router.route('/spms/approve/getcompletelist')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/profile-process-havetodo.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })

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



  //项目list列表
  router.route('/spms/projectjobcard/:id')
    .all(function(req,res,next){
      next();
    })
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });
      var data = fs.readFileSync('routers/files/project-jobcard.json');
      res.end(JSON.stringify(eval("("+data+")")));
      next();
    })
  
router.route('/spms/projecttype/type')
    .all(function(req,res,next){next()})
    .get(function(req,res,next){
      res.writeHead(200, { 'Content-Type': 'application/json' });


      var data = {
    "list": [
      {
        "id": "1",
        "name": "国拨",
        "description": "2342345566",
        "projecttypescheme": [
          {
            "id": "1",
            "name": "项目类型方案A"
          }
        ]
      },
      {
        "id": "2",
        "name": "集团",
        "description": "ss",
        "projecttypescheme": [
          {
            "id": "1",
            "name": "项目类型方案A"
          },
          {
            "id": "4",
            "name": "aa"
          }
        ]
      },
      {
        "id": "3",
        "name": "自立",
        "description": "",
        "projecttypescheme": [
          {
            "id": "1",
            "name": "项目类型方案A"
          },
          {
            "id": "4",
            "name": "aa"
          },
          {
            "id": "5",
            "name": "afa"
          }
        ]
      },
      {
        "id": "4",
        "name": "集团委托",
        "description": "",
        "projecttypescheme": [
          {
            "id": "1",
            "name": "项目类型方案A"
          },
          {
            "id": "4",
            "name": "aa"
          },
          {
            "id": "5",
            "name": "afa"
          }
        ]
      },
      {
        "id": "5",
        "name": "院内",
        "description": "",
        "projecttypescheme": [
          {
            "id": "1",
            "name": "项目类型方案A"
          },
          {
            "id": "4",
            "name": "aa"
          }
        ]
      },
      {
        "id": "6",
        "name": "非科研项目",
        "description": "",
        "projecttypescheme": [
          {
            "id": "4",
            "name": "aa"
          }
        ]
      },
      {
        "id": "7",
        "name": "test",
        "description": "test",
        "projecttypescheme": []
      },
      {
        "id": "8",
        "name": "test2",
        "description": "test2",
        "projecttypescheme": [
          {
            "id": "3",
            "name": "项目类型方案C"
          }
        ]
      }
    ],
    "page": {
      "pageno": 1,
      "pagesize": 20,
      "num": 8
    }
  }


      res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));

      next()
    })
// 项目信息
router.route('/spms/report/monthly/project/:id')
  .all(function(req, res, next){
    next();
  })
  // 获取月报
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly-project-info.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  });

// 单条月报
router.route('/spms/report/monthly')
  .all(function(req, res, next){
    next();
  })
  // 获取月报
  .get(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  // 添加月报
  .post(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })
  // 更新月报
  .put(function(req, res, next){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var data = fs.readFileSync('routers/files/report-monthly.json');
    res.end(JSON.stringify(eval("("+data+")")));
    next();
  })

/**
 * Created by zhailei on 15/5/4.
 */
router.route('/summary/data')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = {
      id:'xxxxxxxx',
      name:'xxxx'
    };
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })
  .post(function(req,res,next){
    setTimeout(function(){
      res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));  
    },3000)
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })
  .put(function(req,res,next){
    var data = {}
    setTimeout(function(){
      res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));  
    },3000)
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next();
  })

router.route('/dataTsv')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var datas = fs.readFileSync('routers/files/data.tsv')
    res.end(datas);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    next()
  })
router.route('/spms/report/project/:id/summary')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = {
      item:{
        achievement_infos: {
          achievements: [
            {
              id: "3aee73c5-23c0-4696-a8c7-2e5e624cd917",
              name: "网盘（定制）",
              plan_complete_time: "1409270400",
              status: "0",
              upload_time: "0",
              user: "",
            },
            {
              id: "8bbad19e-e38c-49bb-a24a-bb513d79de10",name: "中国移动研发IT工具体系",plan_complete_time: "1419984000",status: "0",upload_time: "0",user: ""
            },
            {
              id: "a4bf68ac-21a0-4369-99ff-6ac61feeb87f",name: "日程助手",plan_complete_time: "1404086400",status: "2",upload_time: "0",user: []
            },
            {
              id: "90f63058-6d7a-408a-9046-3a96f79b85a5",name: "研发基础设施",plan_complete_time: "1419984000",status: "0",upload_time: "0",user: ""
            },
            {
              id: "c771c736-7bdf-488e-baac-4593860cd394",name: "相关IT系统",plan_complete_time: "1419984000",status: "0",upload_time: "0",user: []
            },
            {
              id: "dedb4d35-cb72-4744-a9c7-673777609d9a",name: "科研一体化系统",plan_complete_time: "1430352000",status: "0",upload_time: "0",user: []
            }
          ],
          finished: 1,
          partfinished: 0,
          unfinished: 5
        },
        belong_duration: "年度新立",
        code: "R143300500",
        delay_infos:{
          achievements:[
            {
              days: 322,id: "3aee73c5-23c0-4696-a8c7-2e5e624cd917",name: "网盘（定制）",plan_complete_time: "1409270400"
            },
            {
              days: 198,id: "8bbad19e-e38c-49bb-a24a-bb513d79de10",name: "中国移动研发IT工具体系",plan_complete_time: "1419984000"
            },
            {
              days: 382,id: "a4bf68ac-21a0-4369-99ff-6ac61feeb87f",name: "日程助手",plan_complete_time: "1404086400"
            },
            {
              days: 198,id: "90f63058-6d7a-408a-9046-3a96f79b85a5",name: "研发基础设施",plan_complete_time: "1419984000"
            },
            {
              days: 198,id: "c771c736-7bdf-488e-baac-4593860cd394",name: "相关IT系统",plan_complete_time: "1419984000"
            },
            {
              days: 78,id: "dedb4d35-cb72-4744-a9c7-673777609d9a",name: "科研一体化系统",plan_complete_time: "1430352000"
            }
          ],
          milestones: [],
          monthlys:["1398873600","1401552000","1404144000","1406822400","1409500800","1412092800","1414771200","1417363200","1420041600","1422720000", "1425139200", "1427817600", "1433088000"],
          weeklys:["1400428800","1401033600","1401638400","1402243200","1403452800","1405872000","1406476800","1408896000","1411920000","1412524800", "1413129600", "1413734400", "1414339200", "1414944000", "1415548800", "1416153600", "1416758400", "1417363200", "1417968000", "1418572800", "1419177600", "1419782400", "1420387200", "1420992000", "1423411200", "1424016000", "1424620800", "1425225600", "1425830400", "1426435200", "1427644800", "1428249600", "1428854400", "1429459200", "1430064000", "1432483200", "1421596800", "1433692800", "1422201600", "1433088000", "1430668800", "1434902400"]
        },
        duration: "693日",
        labor_complete: 46.66,
        labor_progress: "0%",
        managers:[
          {
            avatar: null,id: "zMxWRWa7aHNGXeRz",name: "何乔"
          },
          {
            avatar: "/openfile/getfile?type=osns_n_avatar&size=large&id=C5wBT3BOpWaoSvze",id: "xnqRV7CuSjHm5VX8",name: "卢红兵",status: "0",title: "IT架构师"
          }
        ],
        memebers:[
          {
            avatar: "",id: "XAiXY9PpaYFWiL3P",name: "王芳",status: "0",title: ""
          },{
            avatar: "/public/images/avatar/l.jpg",id: "nuRekzZ3d8N0y05G",name: "柴瑜",status: "0",title: "项目管理"
          },{
            avatar: "/openfile/getfile?type=osns_n_avatar&size=large&id=wtxubYTwgCy5LhB4",id: "E6kXZGXMLCnuOf35",name: "常江",status: "0",title: "IT架构师"
          }
        ],
        normal_progress: "81.13%",
        parent_id: null,
        pid: "463f7ea8-9b15-48b6-8c69-60289553e0a8",
        plan_end_time: "1448380799",
        plan_opening_time: "0",
        plan_start_time: "1388592000",
        pmms:[
          {
            avatar: "/openfile/getfile?type=osns_n_avatar&size=large&id=B3rXkJ8Kzp4htpb1",id: "q1ox7HfIU2BP3DKR",name: "左静",status: "0",title: "IT架构师"
          },
          {
            avatar: "/openfile/getfile?type=osns_n_avatar&size=large&id=a3eDmwuOZe8FHha6",id: "vnHMSoFVMX0KUv2y",name: "葛鹏",status: "0",title: ""
          }
        ],
        pname: "研发支撑系统开发（2014）",
        real_end_time: "0",
        real_opening_time: "0",
        real_start_time: "1399915422",
        research_progress: "86%",
        status: 4,
        task_info:{completed_num: 0,delay_num: 0,processing_num: 2,suspend_num: 0,tasknum: 2},
        total_fund_budget: 0,
        total_labor_budget: 0,
        type: "院内自立",
        watchers: []
      }
    }    
    // res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}));

    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}))

    next();
  })

router.route('/spms/report/project/:id/finance')
  .all(function(req,res,next){next()})
  .get(function(req,res,next){
    var data = {
      list:[
        {
          code: "移有限分研究合同【2014】0338",executedmoney: 29.536,id: "B478E692-3344-4FF7-866E-3D6C264ADCC7",managers: "王芳",manufacturers: "文思海辉技术有限公司",money: 45.44,name: "测试外协服务项目（2014.7-2015.3）-订单-文思海辉（科管部）",reimbursement: 27.864151,status: "已签",time: 1409155200000
        },{
          code: "移有限分研究合同【2014】0321",executedmoney: 18.257401,id: "61529DF5-C5B7-4E3D-9BCC-FEB3C7530DCD",managers: "王芳",manufacturers: "东软集团股份有限公司",money: 18.257401,name: "科研规划系统改造（2014.8-2015.4）-订单-东软",reimbursement: 17.223963,status: "已签",time: 1408636800000
        },{
          code: "移有限分研究合同【2014】0220",executedmoney: 20.16,id: "074E57EC-8F66-482E-8BF4-25EEB78E6ABA",managers: "王芳",manufacturers: "文思海辉技术有限公司",money: 20.16,name: "关于【研发外协服务项目（2013-2015）-技术服务框架协议-文思海辉（合同编号：移有限分研究合同[2013]224号-5）】的订单",reimbursement: 19.018868,status: "已签",time: 1404662400000
        },{
          code: "移有限分研究合同【2014】0471",executedmoney: 75.780916,id: "D7BB1B54-DD43-4577-BA23-5E454639E5A8",managers: "王芳",manufacturers: "东软集团股份有限公司",money: 94.726145,name: "MPMS与预算系统升级（2014.10-2015.6）-订单-东软(科管部)",reimbursement: 71.49143,status: "已签",time: 1415116800000
        },{
          code: "移有限分研究合同【2014】0588",executedmoney: 0,id: "73B2C245-E79E-47B5-9DC2-BB5F8DC10B6B",managers: "王芳",manufacturers: "广州思迈特软件有限公司",money: 48,name: "BI系统采购合同-思迈特",reimbursement: 0,status: "已签",time: 1418227200000
        },{
          code: "移有限分研究合同【2014】0587",executedmoney: 0,id: "DD6C04A9-E8E9-440B-85C1-1A8454E8AD3F",managers: "王芳",manufacturers: "杭州安恒信息技术有限公司",money: 20.4,name: "安全域改造WAF设备采购-安恒",reimbursement: 0,status: "已签",time: 1418313600000
        },{
          code: "移有限分研究合同【2014】0603",executedmoney: 0,id: "25D781FA-8E26-446C-AED7-42B408A7A342",managers: "王芳",manufacturers: "中国移动通信集团北京有限公司",money: 94.572,name: "互联网专线业务协议、IDC业务租用协议及补充协议-北京移动",reimbursement: 0,status: "已签",time: 1418313600000
        },{
          code: "移有限分研究合同【2014】0581-2",executedmoney: 0,id: "01CCD9D8-875B-453F-B6F0-7C13CCA1EE8A",managers: "曹建军",manufacturers: "华为技术有限公司",money: 15.072488,name: "PC服务器采购-华为 (测试所、科管)",reimbursement: 0,status: "已签",time: 1418140800000
        },{
          code: "移有限分研究合同【2015】0210",executedmoney: 0,id: "00-UD8RRSF4-OHIV-6U27-SZ33-3VWM3QZA6YY5",managers: "张花",manufacturers: "东软集团股份有限公司",money: 4.3697,name: "科研仪表盘升级改造测试（15.5-8）-订单-东软(科管部)",reimbursement: 0,status: "已签",time: 1434038400000
        },{
          code: "移有限分研究合同【2014】0638",executedmoney: 0,id: "887A2071-FBE4-463F-9E37-C940B7DE89C2",managers: "曹建军",manufacturers: "北京威发新世纪信息技术有限公司.",money: 70.6187,name: "交换机采购-威发（科管部）",reimbursement: 0,status: "已签",time: 1419264000000
        },{
          code: "移有限分研究合同【2015】0179",executedmoney: 0,id: "75F14E44-AB04-4E0A-9E24-1E9F7E535B4D",managers: "张花",manufacturers: "上海道勤软件有限公司",money: 95.076863,name: "企业协作平台升级优化（2015.4-2015.10）-订单-道勤（科管部）",reimbursement: 0,status: "已签",time: 1432137600000
        },{
          code: "移有限分研究合同【2014】0608",executedmoney: 0,id: "C12334F1-0EFD-46C5-9BEC-49B75B4893EC",managers: "王芳",manufacturers: "亚信科技（中国）有限公司",money: 48,name: "IT系统维护接入平台-货物采购-亚信",reimbursement: 0,status: "已签",time: 1418659200000
        },{
          code: "移有限分研究合同【2014】0459",executedmoney: 0,id: "997E2B9C-5532-405B-9CE5-1E3C54E581C9",managers: "曹建军",manufacturers: "佳杰科技（上海）有限公司",money: 8.91,name: "HP-C类台式电脑-采购-佳杰科技（科管部）",reimbursement: 0,status: "已签",time: 1415030400000
        },{
          code: "移有限分研究合同【2014】0322",executedmoney: 0,id: "9CC3BFD0-807A-460F-9F2C-D3C6A4B6F2FB",managers: "王芳",manufacturers: "上海道勤软件有限公司",money: 0,name: "基于企业协作平台的科研一体化系统开发-技术服务框架协议-道勤",reimbursement: 0,status: "已签",time: 1408982400000
        },{
          code: "移有限分研究合同【2014】0563",executedmoney: 0,id: "D15A5B58-0E91-42C6-ADD7-E9FEE78651EB",managers: "曹建军",manufacturers: "广州佳杰科技有限公司",money: 51.054554,name: "PC服务器采购-佳杰科技（科管部）",reimbursement: 0,status: "已签",time: 1417968000000
        },{
          code: "移有限分研究合同【2014】0512",executedmoney: 0,id: "233A91E5-FA40-4527-A46A-F494EE3B669F",managers: "王芳",manufacturers: "中移全通系统集成有限公司",money: 94,name: "IT系统支持服务-技术服务合同-全通（科管部）",reimbursement: 0,status: "已签",time: 1417017600000
        },{
          code: "移有限分研究合同【2015】0230",executedmoney: 0,id: "C9A709AE-8872-4D10-B364-2554C80C3F76",managers: "张花",manufacturers: "文思海辉技术有限公司",money: 14.72,name: "测试外协服务项目（15.6-8）-订单-文思海辉（科管部）",reimbursement: 0,status: "已签",time: 1434384000000
        },{
          code: "移有限分研究合同【2014】0556",executedmoney: 0,id: "EA6717AB-F548-4FF8-B236-C88A3BE186E9",managers: "王芳",manufacturers: "北京蓝汛通信技术有限责任公司",money: 44.3988,name: "研发对外运营环境IDC托管服务-主机托管-蓝汛",reimbursement: 0,status: "未启动",time: 1417708800000
        },{
          code: "移有限分研究合同【2015】0174",executedmoney: 0,id: "0973DF82-A9FA-41AB-ABE6-2F27E4421722",managers: "张花",manufacturers: "东软集团股份有限公司",money: 35.4023,name: "科研仪表盘升级改造（2015.4-2015.8）-订单-东软(科管部)",reimbursement: 0,status: "已签",time: 1434297600000
        }
      ],
      page:{
        budget_income: {
          total: 160, 
          data: {
            2014: 476,
             2015: 41.5}
        },
        budget_reply:{
          data: {2014: 476, 2015: 41.5},
          total: 761
        },
        executed:{
          data: {2014: 0, 2015: 0},
          total: 0
        },
        reimbursed:{
          data: {2014: 0, 2015: 0},
          total: 0
        },
        signed:{
          data: {2014: 178.583546, 2015: 0},
          total: 178.583546
        }
      }
    }
    res.end(JSON.stringify({code:0,data:data,systime:Date.parse(new Date())}))
    next();
  })
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

//结尾
}