
/*
* 模板文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Templates', function(Templates, Jma, Backbone, Marionette, $, _){
	Templates.HeaderTemplate = _.template('\
		<div class="bar bar-header" style="position:relative">\
               <div class="">\
                 <h1  class=" " style="display:inline-block;width:33%"><a href="#index/cancel">cancel</a></h1>\
                 <h1 class="bar-active" style="display:inline-block;width:32%"><a href="#index/regist">签到</a></h1>\
                 <h1 class="" style="display:inline-block;width:32.5%"><a href="#index/post">post</a></h1>\
               </div>\
             </div>');





});
