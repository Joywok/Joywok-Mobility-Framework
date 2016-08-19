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