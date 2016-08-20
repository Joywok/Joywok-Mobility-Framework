
/*
* 路由文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'apps/qiandao':'qiandao',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		qiandao: function(){
			//console.log('qiandao')
			Jma.module('Apps.Qiandao').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
