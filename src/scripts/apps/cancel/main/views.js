
/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Ehr.module('Cancel.Views',function(Views, Ehr, Backbone, Marionette, $, _){

    Views.CancelView= Marionette.ItemView.extend({
        className: 'Cancel',
        template: Ehr.Cancel.Templates.CancelTemplate,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
