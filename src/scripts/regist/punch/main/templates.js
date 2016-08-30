
/*
* 模板文件
* createDate:2016-08-29 10:53:30
* author: XXXXXX
*/
Jma.module('Punch.Templates', function(Templates, Jma, Backbone, Marionette, $, _){
    Templates.dialogTemplate=_.template('<div class="success-dialog">\
    	<div class="title">\
    	 <i class="fa fa-map-marker" aria-hidden="true"></i>\
    	 <div class="date"><%=time%></div>\
    	</div>\
    	</div>');

     Templates.LayoutTemplate=_.template('<div class="punch-container">\
    	<div class="personInfo" id="personInfo">\
        </div>\
    	<div class="punchRecord" id="punchRecord">\
    	</div>\
    	</div>');
     Templates.personInfoTemplate=_.template('\
            <div class="person-avatar"><img src="<%=avatar()%>"/></div>\
            <div class="person">\
                <span class="name"><%=initname()%></span>\
                <span class="fontColor"><%=desc()%></span>\
            </div>\
            <div class="date"><%=date()%></div>\
        ');

     Templates.recordItemTemplate=_.template('\
     	<div class="list-item">\
       <%=Content()%><span><%=initTime()%></span>\
       <span><%=Location()%></span>\
        </div>\
           ');

     Templates.recordTemplate=_.template('<div class="record"></div>');
     


});
