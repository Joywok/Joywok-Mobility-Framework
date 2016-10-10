
/*
* 模板文件
* createDate:2016-10-09  9:19:44
* author: XXXXXX
*/
Jma.module('Demo.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.Layout = _.template('<div class="layout-view-w">\
																 	<div class="layout-header">\
																 		<div class="header-info">\
																 			<div class="header-pic"><i class="fa fa-user"></i></div>\
																 			<div class="header-name">\
																 				<span>Zhai lei</span>\
																 				<span>前端开发</span>\
																 			</div>\
																 		</div>\
																 		<div class="header-opear">\
																 			<i class="fa fa-bars"></i>\
																 		</div>\
																 	</div>\
																 	<div class="layout-list-w list">\
																 		<div class="layout-list list-w"></div>\
																 	</div>\
																 </div>')

	Templates.EmptyView = _.template('里面没有内容了');
	Templates.ItemView = _.template('<a href="#demo/info"><div class="list-item-w">\
																		<label><%=id%></label>\
																		<div class="list-item-val ellipsis"><%=initValue() %></div>\
																   </div></a>')
});
