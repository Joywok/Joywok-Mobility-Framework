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