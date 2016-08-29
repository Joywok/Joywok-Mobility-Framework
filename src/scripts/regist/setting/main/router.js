
/*
* 路由文件
* createDate:2016-08-29 10:53:39
* author: XXXXXX
*/
Jma.module('Setting.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist/setting':'setting',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		setting: function(){
			//console.log('setting')
			Jma.module('Regist.Setting').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
