/*
 *   路由
 */
Jma.module('Apps.Router', function(Router, Jma, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Jma.AppRouter.extend({
        appRoutes: {
            '': 'index',
            'index/cancel': 'cancel',
            'index/post': 'post',
            'index/regist': 'regist'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function() {
            var self = this;
            Backbone.history.navigate('#index/regist');
            Jma.module('Apps').StartApp();
             Jma.module('registCenter').StartApp();
        },
        post: function() {
            Jma.module('Post').StartApp();
            Jma.module('Apps').StartApp();
        },
        regist: function() {
            Jma.module('registCenter').StartApp();
            Jma.module('Apps').StartApp();

        },
        cancel:function(){
              Jma.module('Cancel').StartApp();
            Jma.module('Apps').StartApp();

        }

    });
    Router.on('start', function() {
        new Router.Router({
            controller: new Router.Controller
        });
    });

});
