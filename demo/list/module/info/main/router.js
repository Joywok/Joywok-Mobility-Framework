
/*
* 路由文件
* createDate:2016-10-09 21:14:14
* author: XXXXXX
*/
Jma.module('Info.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			// 'demo/info':'info',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		info: function(){
			//console.log('info')
			// Jma.module('Demo.Info').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
