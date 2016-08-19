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