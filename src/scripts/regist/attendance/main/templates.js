/*
 * 模板文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Attendance.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {
    Templates.dialogTemplate = _.template('<div class="success-dialog">\
        <div class="title">\
         <i class="fa fa-map-marker" aria-hidden="true"></i>\
         <div class="date"><%=time%></div>\
        </div>\
        </div>');

    Templates.LayoutTemplate = _.template('<div class="Attendance-container">\
        <div class="personInfo" id="personInfo">\
        </div>\
        <div class="date" id="date">\
        </div>\
        <div class="AttendanceRecord" id="AttendanceRecord">\
        </div>\
        <div class="Attendance-action" id="AttendanceAction">\
        </div>\
        </div>');
    Templates.personInfoTemplate = _.template('\
        <div class="person-avatar"><img src="<%=avatar()%>"/></div>\
         <div class="person">\
          <span class="name"><%=initname()%></span>\
          <span class="Attendance-category"><%=desc()%></span>\
          </div>\
        ');

    Templates.recordItemTemplate = _.template('\
       <div class="list-item">\
        <span><%= Work()%></span>\
        <span><%=Text()%></span>\
        <span><%=initTime()%></span>\
       <%=Localtion()%>\
       </div>\
           ');

    Templates.recordTemplate = _.template('<div class="record"></div>');

    Templates.AttendanceActionTemplate = _.template('\
      <div class="Action">\
        <div class="Attendance-next">\
         <div class="nextAttendance">\
          <span><%=getText().text1%></span>\
          <span><%=getText().text2%></span>\
         </div>\
        <div class="Attendance-outer">\
         <div class="inner">\
          <div class="title"><%=getText().text2%></div>\
          <div class="time"><%=getTime()%></div>\
         </div>\
        </div>\
       </div>\
    </div>');

});
