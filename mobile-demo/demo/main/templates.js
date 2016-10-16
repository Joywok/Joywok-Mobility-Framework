
/*
* 模板文件
* createDate:2016-10-13 14:47:10
* author: XXXXXX
*/
Jma.module('Demo.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.Layout = _.template('<div class="mobile-list-w">\
                                  <div class="bar bar-header">\
                                    <div class="bar-w">\
                                      <a href="/mobilecss/index.html"><button type="button" class="btn">Css组件</button></a>\
                                      <a href="/javascript/index.html"><button type="button" class="btn right">Js组件</button></a>\
                                      <h1 class="ellipsis">JMF-Demo-List</h1>\
                                    </div>\
                                  </div>\
                                  <div class="mobile-list-c list">\
                                  </div>\
                                 </div>')


  Templates.ItemView = _.template('<div class="list-block-h"><%=initHeader()%></div>\
                                   <div class="list-block-w">\
                                    <%=initChildList()%>\
                                   </div>')

});
