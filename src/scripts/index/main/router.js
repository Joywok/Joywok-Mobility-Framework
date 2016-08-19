
/*
* 路由文件
* createDate:2016-08-10 19:05:29
* author: XXXXXX
*/
// Ehr.module('Regist.Router', function(Router, Ehr, Backbone, Marionette, $, _){

// 	Router.startWithParent = true;

// 	Router.Router = Ehr.AppRouter.extend({
// 		appRoutes:{
// 			"index":'index',		
// 		}
// 	});

// 	Router.Controller = Marionette.Controller.extend({
// 		 index: function(){
//             Backbone.history.navigate('#index')
//             Ehr.Regist.StartApp();
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
Ehr.module('Apps.Router', function(Router, Ehr, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Ehr.AppRouter.extend({
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
            Ehr.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        personinfo: function() {
            Ehr.module('PersonInfo').StartApp();
            Ehr.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        regist: function() {
                        Ehr.module('registCenter').StartApp();
            Ehr.module('Apps').StartApp({ module: 'PersonInfo' });

        }
    });
    Router.on('start', function() {
        new Router.Router({
            controller: new Router.Controller
        });
    });

});
