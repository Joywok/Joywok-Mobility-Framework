
/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Views',function(Views, Jma, Backbone, Marionette, $, _){

	Views.HeaderItem= Marionette.ItemView.extend({
		className: 'navbar',
		template: Jma.Apps.Templates.HeaderTemplate ,
         initialize: function(){
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
