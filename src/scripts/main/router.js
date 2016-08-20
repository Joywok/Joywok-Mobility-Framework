/******************************************************************
 *
 * 全局路由
 * creator： yjl
 * date: 2016-03-31
 *******************************************************************/
Jma.module('Router', function(Router, Jma, Backbone, Marionette, $, _){
    Router.startWithParent = true;
    Router.Router = Jma.AppRouter.extend({
        appRoutes:{
            '':'index',
            // 'index':'index',
            // 'index/post':'post'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function(){
            Backbone.history.navigate('#index');
            Jma.apps.StartApp();
        },
        post: function(){
            console.log(123);
            Jma.Post.StartApp();
        }
    });
    Router.on('start', function(){
        new Router.Router({
            controller: new Router.Controller
        });
    });
});

