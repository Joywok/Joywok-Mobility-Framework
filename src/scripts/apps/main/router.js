/*
 *   路由
 */
Ehr.module('Apps.Router', function(Router, Ehr, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Ehr.AppRouter.extend({
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
            Ehr.module('Apps').StartApp();
             Ehr.module('registCenter').StartApp();
        },
        post: function() {
            Ehr.module('Post').StartApp();
            Ehr.module('Apps').StartApp();
        },
        regist: function() {
            Ehr.module('registCenter').StartApp();
            Ehr.module('Apps').StartApp();

        },
        cancel:function(){
              Ehr.module('Cancel').StartApp();
            Ehr.module('Apps').StartApp();

        }

    });
    Router.on('start', function() {
        new Router.Router({
            controller: new Router.Controller
        });
    });

});
