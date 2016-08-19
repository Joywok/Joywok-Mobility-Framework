
/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Ehr.module('Apps.Views',function(Views, Ehr, Backbone, Marionette, $, _){

	Views.HeaderItem= Marionette.ItemView.extend({
		className: 'navbar',
		template: Ehr.Apps.Templates.HeaderTemplate ,
         initialize: function(){
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
