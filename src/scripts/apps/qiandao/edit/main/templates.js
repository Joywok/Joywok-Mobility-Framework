/*
 * 模板文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Edit.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {
    // <textarea placeholder="你想说点什么呢？" id="content"></textarea>\
    Templates.EditTemplate = _.template('\
        <div class="edit">\
         <div class="qiandaoLeaveWord" id="leaveWord">\
       \
         </div>\
         <div class="qiandaoDate" id="qiandaoDate">\
         <div id="dateSelect" ></div>\
         </div>\
         <div class="saveBtn" id="saveInfo" style="margin:10px 0;">\
         <a href="#apps/qiandao">\
         <button type="button" class="btn btn4 editSave">保存</button>\
         </a>\
        </div>\
        </div>')
    Templates.EditDateTemplate = _.template('<form class="form-horizontal list-form" role="form">\
        <div class="col-md-12">\
           \
             <div data-fieldsets></div>\
           \
            </div>\
        </form>');

    Templates.EditWord_template = _.template('<form class="form-horizontal list-form" role="form">\
        <div class="col-md-12">\
             <div data-fieldsets></div>\
            </div>\
        </form>\
    ');
    Templates.Form_Field_template = _.template('<div class="form-group field-<%= key %>">\
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



    Templates.Form_Field_template_151000_nomax = _.template('\
      <div class="form-group field-<%= key %>">\
        <label class="col-md-1 control-label" style="width: 15.1000%" for="<%= editorId %>"><%= description %> <%= title %></label>\
        <div class="col-md-1 project-form-value" style="width: 84.9000%" >\
        <span data-editor></span>\
        <p class="help-block" data-error></p>\
        <p class="help-block"><%= help %></p>\
        </div>\
      </div>\
    ');
});
