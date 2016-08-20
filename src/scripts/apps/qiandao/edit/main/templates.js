/*
 * 模板文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Edit.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {

    Templates.EditTemplate = _.template('\
        <div class="edit">\
         <div class="qiandaoLeaveWord" id="leaveWord">\
         <textarea placeholder="你想说点什么呢？" id="content"></textarea>\
         </div>\
         <div class="qiandaoDate" id="qiandaoDate">\
         <label style="width:28%;text-align:center">选择日期：</label>\
         <div id="dateSelect" style="display:inline-block;width:70%;text-align:left"></div>\
         </div>\
         <div class="saveBtn" id="saveInfo" style="margin:10px 0;">\
         <a href="#apps/qiandao">\
         <button type="button" class="btn btn4 editSave">保存</button>\
         </a>\
        </div>\
        </div>')
    Templates.EditDateTemplate = _.template('\
         <div class="form-group field-<%= key %>">\
          <div class="col-sm-12 project-form-value">\
           <span data-editor></span>\
           <p class="help-block" data-error></p>\
           <p class="help-block"><%= help %></p>\
          </div>\
       </div>');

     Templates.FilterDate = _.template('<form class="form-horizontal list-form" role="form">\
        <div class="col-md-12">\
            <div class="col-md-5 time-label"><font class="form-label">时间：</font><font class="text-muted">从</font>\
                <div data-fields="apply_start_time" class="time-filed"></div>\
            </div>\
        </form>\
    ');
 Templates.Form_Field_template= _.template('<div class="form-group field-<%= key %>">\
        <label class="col-sm-0 control-label" for="<%= editorId %>">\
            <% if (titleHTML){ %><%= titleHTML %>\
            <% } else { %><%- title %><% } %>\
        </label>\
        <div class="col-sm-12">\
            <span data-editor></span>\
            <p class="help-block" data-error></p>\
            <p class="help-block"><%= help %></p>\
        </div>\
    </div>\
    ');
});
