/*
 * 主文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Post', function(Post, Jma, Backbone, Marionette, $, _) {

    Post.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('PersonalInfo.Post');
            this.model = new Jma.Post.Entities.Model();
            this.view = new Jma.Post.Views.PostView({
                model: this.model
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    Post.StartApp = function(options) {
        Post.Controllers = new Post.Controller(options);
    };
    Post.StopApp = function(options) {
        console.log('stop');
    };

})
