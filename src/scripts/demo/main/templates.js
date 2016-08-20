
/*
* 模板文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.testTemplate = _.template('<div class="list">\
                <div class="list-h"></div>\
                  <div class="list-w">\
                    <div class="list-block">\
                     <div class="list-block-h"></div>\
                     <div class="list-block-w">\
                       <div class="list-item list-item-icon">\
                          <i class="icon icon-address active"></i>\
                          <div  class="list-item-w">\
                            <div class="list-item-val ellipsis"><span id="weekday" style="display:inline-block;width:10%"></span><span style="display:inline-block;text-align:center;width:90%" type="date" id="riqi"></span></div>\
                          </div>\
                        </div>\
                     </div>\
                    </div>\
                  </div>\
               </div>');

});
