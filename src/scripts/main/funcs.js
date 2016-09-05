 /******************************************************************
  *
  * 全局方法集合
  * creator： yjl
  * date: 2016-03-31
  *
  *******************************************************************/

 Jma.module('Funcs', function(Dicts, Funcs, Backbone, Marionette, $, _) {
     /*
      * 四舍五入保留小数不够补全0
      * val： 数值
      * length: 保留小数位数
      */
     Funcs.fixedNum = function(val, length) {
         if (length < 0) length = 0;
         var fixedNum = Math.round(parseFloat(val) * Math.pow(10, length + 1) / 10) / Math.pow(10, length);
         var decimalLength = (fixedNum.toString().split(".")[1] ? fixedNum.toString().split(".")[1].length : 0);
         if (isNaN(fixedNum)) {
             return '0.00';
         } else {
             if (decimalLength == 0 && length !== 0) {
                 fixedNum = fixedNum + '.';
             }
             for (var i = decimalLength; i < length; i++) {
                 fixedNum = fixedNum.toString() + '0';
             }
             return fixedNum + '';
         }
     };
     Funcs.getDate = function() {
         var presentDate = new Date();
         var year = presentDate.getFullYear();
         var month = presentDate.getMonth() + 1;
         var date = presentDate.getDate();
         var weekday = presentDate.getDay();
         var riqi = year + '-' + month + '-' + date;
         return {
             date: {
                 riqi: riqi,
                 weekday: "星期" + weekday
             }
         }
     };
     Funcs.getWeekDay = function(datevalue) {
         var newDate = new Date(datevalue)
         var str = "";
         switch (newDate.getDay()) {
             case 1:
                 str = "星期一"
                 break;
             case 2:
                 str = "星期二"
                 break;
             case 3:
                 str = "星期三"
                 break;
             case 4:
                 str = "星期四"
                 break;
             case 5:
                 str = "星期五"
                 break;
             case 6:
                 str = "星期六"
                 break;
             case 7:
                 str = "星期日"
                 break;
         }
         return str;
     }

 });
