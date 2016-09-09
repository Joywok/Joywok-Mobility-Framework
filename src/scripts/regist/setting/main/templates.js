/*
 * 模板文件
 * createDate:2016-08-29 10:53:39
 * author: XXXXXX
 */
Jma.module('Setting.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {

Templates.LayoutTemplate = _.template('\
          <div class="add">\
          </div>\
      ');
    Templates.itemTemplate = _.template('\
          <div class="add-group">\
            <div class="add-icon">\
               <i class="fa fa-plus"></i>\
            </div>\
            <div class="add-val">新增考勤组</div>\
          </div>\
          <div class="main">\
          </div>\
      ');


});
