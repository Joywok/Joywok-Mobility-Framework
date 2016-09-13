/*
 * 模板文件
 * createDate:2016-09-07 12:00:15
 * author: XXXXXX
 */
Jma.module('Addgroup.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {

    Templates.LayoutTemplate = _.template('<div class="select">\
		<div class="save">保存</div>\
		<div class="cancel">取消</div>\
	    <div class="select-member"></div>\
		\
		<div class="more-setting"></div>\
		<div class="select-work-system"></div>\
		</div>');

    Templates.toggleTemplate = _.template('<form class="form-horizontal list-form" role="form">\
        <div class="col-md-12">\
             <div data-fieldsets></div>\
            </div>\
        </form>\
    ');
});
