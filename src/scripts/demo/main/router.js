
/*
* 路由文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'demo':'demo',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		demo: function(){
			//console.log('demo')
			Jma.module('Demo').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
