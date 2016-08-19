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
