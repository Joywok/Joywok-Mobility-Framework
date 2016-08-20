
/*
* 路由文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info', function(Info, Jma, Backbone, Marionette, $, _){

	Info.startWithParent = true;

	var router = {};

	router.Router = Jma.AppRouter.extend({
		appRoutes:{
			// 'apps/qiandao/info':'info',
		}
	});

	router.Controller = Marionette.Controller.extend({
		info: function(){
			//console.log('info')
			// Jma.module('Qiandao.Info').StartApp();
		}
	});

	Info.on('start', function(){
		new router.Router({
			controller: new router.Controller
		});
	});

});
