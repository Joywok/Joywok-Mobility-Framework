
/*
* 路由文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'test':'test',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		test: function(){
			//console.log('test')
			Jma.module('Test').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
