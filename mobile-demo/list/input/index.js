
var url = window.location.hash.split('?');
if(url.length>1){
  var type = url[1].split('=')[1];
}else{
  //url错误
}
var ListTemplate = [
  require('list/input/a.js'),
  require('list/input/b.js'),
  require('list/input/c.js')
]
var data = type.slice(0,1).toUpperCase();
var Tip = data+type.slice(1);
var template = _.template('<div class="bar bar-header">\
                    <div class="bar-w">\
                    <a href="#demo"><button type="button" class="btn">返回</button></a>\
                    <h1 class="ellipsis">'+Tip+'</h1>\
                    </div>\
                   </div>\
                   <div class="list-info-main list">\
                    <div class="list-w">\
                    '+(_.map(ListTemplate,function(i){return i["template"]}).join(""))+'\
                    </div>\
                   </div>')
var layoutView = Marionette.LayoutView.extend({
  className:'list-info',
  template:template,
  onShow:function(){
    _.each(ListTemplate,function(i){
      if(i['callBack'] && typeof(i['callBack']) == 'function'){
        i['callBack']();
      }
    })
  }
})
console.log('xxxx');
Jma.mainRegion.show(new layoutView())