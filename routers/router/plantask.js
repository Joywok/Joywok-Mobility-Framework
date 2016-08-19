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
