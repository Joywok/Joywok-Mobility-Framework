Jma.module('Attendance.Funcs', function(Funcs, Jma, Backbone, Marionette, $, _) {



 Funcs.getTime = function(datevalue) {
         var newDate = new Date(datevalue)
         var hour = newDate.getHours();
         var minute = newDate.getMinutes();
         var second = newDate.getSeconds();
         return (hour < 10 ? '0' + hour : hour) + ":" + (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second);
     }



})
