/*
 * 模板文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Edit.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {

    Templates.EditTemplate = _.template('\
		<div class="edit">\
         <div class="qiandaoLeaveWord" id="leaveWord">\
         <textarea placeholder="你想说点什么呢？"></textarea>\
         </div>\
         <div class="qiandaoDate" id="qiandaoDate"></div>\
         <div class="saveBtn" id="saveInfo">\
         <button type="button" class="btn btn4">按钮4</button>\
        </div>\
		</div>');
 
		

});
