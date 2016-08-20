
/*
* 模板文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){
	var Templates = {};
	Qiandao.Templates =  Templates;

	Templates.loadingViewTemplate = _.template('<div class="qiandao-loding">加载中…</div>')
	Templates.emptyViewTemplate = _.template('<div class="qiandao-empty">暂无数据</div>')
	Templates.LayoutViewTemplate = _.template('<div class="qiandao">\
																								<div class="qiandao-title">签到列表</div>\
																								<div class="qiandao-new">新建</div>\
																								<div class="qiandao-w"></div>\
																							</div>')

	Templates.ChildViewTemplate = _.template('<div class="qiandao-item-c">\
																							<div class="qiandao-item-content"><%= initContent() %></div>\
																							<div class="qiandao-item-time"><%= initTime() %></div>\
																						</div>')
	Templates.CollectionViewTemplate = _.template('<div class="qiandao-c></div>')

});
