
/*
* 模板文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){
	var Templates = {};
	Qiandao.Templates =  Templates;

	Templates.LayoutViewTemplate = _.template('<div class="qiandao">\
																								<div class="qiandao-title">签到列表</div>\
																								<div class="qiandao-new">新建</div>\
																								<div class="qiandao-w"></div>\
																							</div>')

});
