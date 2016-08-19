
/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Ehr.module('Post.Views',function(Views, Ehr, Backbone, Marionette, $, _){

    Views.PostView= Marionette.ItemView.extend({
        className: 'Post',
        template: Ehr.Post.Templates.PostTemplate,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
