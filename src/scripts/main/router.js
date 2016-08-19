/******************************************************************
 *
 * 全局路由
 * creator： yjl
 * date: 2016-03-31
 *******************************************************************/
Ehr.module('Router', function(Router, Ehr, Backbone, Marionette, $, _){
    Router.startWithParent = true;
    Router.Router = Ehr.AppRouter.extend({
        appRoutes:{
            '':'index',
            // 'index':'index',
            // 'index/post':'post'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function(){
            Backbone.history.navigate('#index')
            Ehr.Regist.StartApp();
        },
        post: function(){
            console.log(123);
            Ehr.Post.StartApp();
        }
    });
    Router.on('start', function(){
        new Router.Router({
            controller: new Router.Controller
        });
    });
});

