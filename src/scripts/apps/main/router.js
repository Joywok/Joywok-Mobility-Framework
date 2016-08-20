
/*
* 路由文件
* createDate:2016-08-20 10:25:51
* author: XXXXXX
*/
Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _){
	Apps.startWithParent = true;
	var router = {};
	
	router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'apps/qiandao':'qiandao',
		}
	});

	router.Controller = Marionette.Controller.extend({
		qiandao: function(){
			Jma.module('Qiandao').StartApp();
		}
	});

	Apps.on('start', function(){
		new router.Router({
			controller: new router.Controller
		});
	});

	Apps.Router = router

});
