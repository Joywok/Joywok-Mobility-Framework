
/*
* 模板文件
* createDate:2016-10-13 14:47:15
* author: XXXXXX
*/
Jma.module('Info.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.LayoutView = _.template('<div class="bar bar-header">\
                                      <div class="bar-w">\
                                      <a href="#demo"><button type="button" class="btn">返回</button></a>\
                                      <h1 class="ellipsis"><%=initHeader()%></h1>\
                                      </div>\
                                     </div>\
                                     <div class="list-info-main"></div>');

});
