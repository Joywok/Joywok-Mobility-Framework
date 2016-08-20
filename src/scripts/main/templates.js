/******************************************************************
 *
 * 全局模板
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Jma.module('Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	// 无Label 表单项模板
  Templates.Form_Field_template_0_12 = _.template('\
    <div class="form-group field-<%= key %>">\
      <div class="col-sm-12 project-form-value">\
      <span data-editor></span>\
      <p class="help-block" data-error></p>\
      <p class="help-block"><%= help %></p>\
      </div>\
    </div>\
  ');

  Templates.datalist = _.template('\
    <div data-region="filter"></div>\
    <div data-region="list-content"></div>\
    <div data-region="pagination"></div>\
  ');

  Templates.emptyTemplate = _.template('\
    <div class="loading"><img src="/public/images/new_osn/loading.gif"/> loading</div>\
  ');

  Templates.Form_Field_template_3_9_nomax_tips = _.template('\
      <div class="form-group field-<%= key %>">\
        <label class="col-xs-3 control-label" for="<%= editorId %>"><%= description %> <%= title %></label>\
        <div class="col-xs-9">\
        <span data-editor></span>\
        </div>\
      </div>\
    ');
	
});