
/*
* 路由文件
* createDate:2016-10-13 14:47:10
* author: XXXXXX
*/
Jma.module('Demo.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
		  '':'demo',
			'demo':'demo',
		}
	});
	Router.Controller = Marionette.Controller.extend({
		demo: function(){
      Backbone.history.navigate('#demo');
			Jma.module('Demo').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
