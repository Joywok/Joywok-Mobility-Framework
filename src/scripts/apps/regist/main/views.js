
/*
* 视图文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('registCenter.Views',function(Views, Jma, Backbone, Marionette, $, _){

	 Views.registView = Marionette.ItemView.extend({
        className: 'regist-container',
        template: Jma.registCenter.Templates.registTemplate ,
        initialize: function() {

        },
        templateHelpers: function() {
            var self = this;
            return {};
        }
    })

})
