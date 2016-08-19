
/*
* 视图文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Ehr.module('registCenter.Views',function(Views, Ehr, Backbone, Marionette, $, _){

	 Views.registView = Marionette.ItemView.extend({
        className: 'regist-container',
        template: Ehr.registCenter.Templates.registTemplate ,
        initialize: function() {

        },
        templateHelpers: function() {
            var self = this;
            return {};
        }
    })

})
