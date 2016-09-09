
/*
* 模板文件
* createDate:2016-09-07 12:00:15
* author: XXXXXX
*/
Jma.module('Addgroup.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.LayoutTemplate = _.template('<div class="select">\
		<div class="goback"></div>\
	    <div class="select-member"></div>\
		\
		<div class="more-setting"></div>\
		<div class="select-work-system"></div>\
		</div>');

	Templates.BackTemplate = _.template('\
		<div class="go-back">返回</div>');

});
