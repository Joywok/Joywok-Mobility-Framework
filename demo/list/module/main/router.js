
/*
* 路由文件
* createDate:2016-10-09  9:19:44
* author: XXXXXX
*/
Jma.module('Demo.Router', function(Router, Jma, Backbone, Marionette, $, _){
	Router.startWithParent = true;
	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
		  '':'index',
      'demo':'index',
			'demo/info':'info',
		}
	});
	Router.Controller = Marionette.Controller.extend({
    index: function(){
      Backbone.history.navigate('#demo');
      Jma.Demo.StartApp();
    },
		info: function(){
			Jma.mainRegion.$el.html('');
			Jma.module('Demo.Info').StartApp();
		}
	});
	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
