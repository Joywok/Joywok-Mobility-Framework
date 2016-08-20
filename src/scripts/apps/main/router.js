
/*
* 路由文件
* createDate:2016-08-20 10:25:51
* author: XXXXXX
*/
Jma.module('Apps.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'qiandao':'qiandao',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		qiandao: function(){
			Jma.module('Apps.Qiandao').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
