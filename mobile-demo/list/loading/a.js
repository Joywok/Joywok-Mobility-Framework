/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'loading'
var id = 'loading';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h"></div>\
                    <div class="list-block-w">\
                      <div class="region-loading region-1"></div>\
                      <div class="region-loading region-2"></div>\
                      <div class="region-loading region-3"></div>\
                      <div class="region-loading region-4"></div>\
                      <div class="region-loading region-5"></div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
  callBack:function(){
    new Jma.Loading.main({
      region:$('.region-1'),
      type:1
    })
    new Jma.Loading.main({
      region:$('.region-2'),
      type:2
    })
    new Jma.Loading.main({
      region:$('.region-3'),
      type:3
    })
    new Jma.Loading.main({
      region:$('.region-4'),
      type:4
    })
    new Jma.Loading.main({
      region:$('.region-5'),
      type:5
    })
  }
}

