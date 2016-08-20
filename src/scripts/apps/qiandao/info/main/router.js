
/*
* 路由文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Info.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			// 'apps/qiandao/info':'info',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		info: function(){
			//console.log('info')
			// Jma.module('Qiandao.Info').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
