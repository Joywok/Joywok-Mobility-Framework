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