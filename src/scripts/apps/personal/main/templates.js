/*
 * 模板文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Ehr.module('Post.Templates', function(Templates, Ehr, Backbone, Marionette, $, _) {
    Templates.PostTemplate = _.template('<div class="list">\
                                          <div class="list-h"></div>\
                                          <div class="list-w">\
                                             <div class="list-item">\
                                                <div class="list-item-w">\
                                                  <label>机构代码:</label>\
                                                  <div class="list-item-val ellipsis">0102</div>\
                                                </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构名称:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构地址:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>职位信息:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>其他介绍:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>客户姓名:</label>\
                                                  <div class="list-item-val ellipsis">刘金玉</div>\
                                               </div>\
                                             </div>\
                                           </div>\
                                       </div>');
});
