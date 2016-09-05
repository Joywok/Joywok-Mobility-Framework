
/*
* 模板文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Regist.Statistics', function(Statistics, Jma, Backbone, Marionette, $, _){

	var Templates = {};
	Templates.LayoutView = _.template('<div class="regist-list">\
																			<div class="regist-list-title">\
																				<div class="regist-list-changeDate"></div>\
																				<%=initUser()%>\
																			</div>\
																			<div class="regist-list-c">\
																			</div>\
																		 </div>');
	Templates.emptyView = _.template('')
	Templates.ItemView = _.template('<div class="regist-list-item-w <%=initActive()%>">\
																		<div class="regist-list-item-header">\
																			<div class="regist-list-item-date"><%=initDate()%></div>\
																		</div>\
																		<div class="regist-list-item-c list">\
																			<div class="list-w">\
																				<%=initList()%>\
																			</div>\
																		</div>\
																	 </div>');

	Templates.listView = _.template('<div class="list">\
																		<div class="list-w"></div>\
																	 </div>')

	Statistics.Templates = Templates
});
