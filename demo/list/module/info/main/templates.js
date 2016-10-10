
/*
* 模板文件
* createDate:2016-10-09 21:14:14
* author: XXXXXX
*/
Jma.module('Info.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.testTemplate = _.template('html代码');

	Templates.cardView = _.template('<div class="card-bg"></div>\
																		 <div class="card-bg-color"></div>\
																		 <div class="card-w">\
																		  <div class="avatar avatar-2">\
																		   <img src="http://www.joywok.com/public/images/avatar/hdr-pic.png"/>\
																		  </div>\
																		  <div class="card-name">翟磊</div>\
																		 </div>\
																		</div>')
	Templates.layout = _.template('<div class="info-view-w">\
																	<a href="#demo"><div class="info-back">返回</div></a>\
																 	<div class="info-card">\
																 	</div>\
																 	<div class="info-data-w">\
																 	</div>\
																 </div>')

	Templates.infoView = _.template('<div class="info-data-c">\
																		<div class="info-data-id">Address:<%=user["id"]%></div>\
																		<div class="info-data-value">Money:￥<%=initContent() %></div>\
																	 </div>')
});
