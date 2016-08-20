
/*
* 路由文件
* createDate:2016-08-10 19:05:29
* author: XXXXXX
*/
// Jma.module('Regist.Router', function(Router, Jma, Backbone, Marionette, $, _){

// 	Router.startWithParent = true;

// 	Router.Router = Jma.AppRouter.extend({
// 		appRoutes:{
// 			"index":'index',		
// 		}
// 	});

// 	Router.Controller = Marionette.Controller.extend({
// 		 index: function(){
//             Backbone.history.navigate('#index')
//             Jma.Regist.StartApp();
//         }
// 	});

// 	Router.on('start', function(){
// 		new Router.Router({
// 			controller: new Router.Controller
// 		});
// 	});

// });


/*
 *   路由
 */
Jma.module('Apps.Router', function(Router, Jma, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Jma.AppRouter.extend({
        appRoutes: {
            '': 'index',
            'index/personal': 'index',
            'index/personinfo': 'personinfo',
            'index/regist': 'regist'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function() {
            var self = this;
            Backbone.history.navigate('#index/personal');
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        personinfo: function() {
            Jma.module('PersonInfo').StartApp();
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        regist: function() {
                        Jma.module('registCenter').StartApp();
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });

        }
    });
    Router.on('start', function() {
        new Router.Router({
            controller: new Router.Controller
        });
    });

});
