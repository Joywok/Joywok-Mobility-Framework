
/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Post.Views',function(Views, Jma, Backbone, Marionette, $, _){

    Views.PostView= Marionette.ItemView.extend({
        className: 'Post',
        template: Jma.Post.Templates.PostTemplate,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
