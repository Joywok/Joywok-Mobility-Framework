
/*
* 路由文件
* createDate:2016-08-29 10:53:20
* author: XXXXXX
*/
Jma.module('Regist.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist':'regist',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		regist: function(){
			//console.log('regist')
			Jma.module('Regist').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
