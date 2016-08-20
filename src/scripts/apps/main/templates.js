
/*
* 模板文件
* createDate:2016-08-20 10:25:51
* author: XXXXXX
*/
Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _){

	var Templates ={};

	Templates.LayoutViewTemplate = _.template('\
		<div class=""><a href="#apps/qiandao">进入签到应用</a></div>\
		')

	Apps.Templates = Templates;

});
