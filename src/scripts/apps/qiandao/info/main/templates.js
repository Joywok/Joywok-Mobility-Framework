
/*
* 模板文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info', function(Info, Jma, Backbone, Marionette, $, _){
	var Templates = {};
	Info.Templates = Templates;

	Templates.LayoutViewTemplate = _.template('<div class="qiandao-info-w">\
																							</div>')
	Templates.InfoViewTemplate = _.template('<div class="qiandao-info-title">\
																									<a href="#apps/qiandao"><div class="qiandao-info-back"><</div></a>\
																									<div class="qiandao-info-val"><%= id %></div>\
																								</div>\
																								<div class="qiandao-info-c">\
																									<div class="qiandao-info-item content">\
																										<div class="qiandao-info-item-c">\
																											<label>内容</label>\
																											<div class="qiandao-info-main"><%=initContent()%></div>\
																										</div>\
																									</div>\
																									<div class="qiandao-info-item">\
																										<div class="qiandao-info-item-c">\
																											<label>时间</label>\
																											<div class="qiandao-info-main"><%=initDate()%></div>\
																										</div>\
																									</div>\
																								</div>')
});
