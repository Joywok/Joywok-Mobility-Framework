
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
			'qiandao':'qiandao',
			'apps/qiandao/edit':'edit'
		}
	});

	router.Controller = Marionette.Controller.extend({
		qiandao: function(){
			Jma.module('Apps.Qiandao').StartApp();
		},
		edit: function(){
			console.log(Jma,'123',如果你走这里的话，你的Qiandao模块启动了me ?，你的)
			// Jma.module('Qiandao.Edit').StartApp();
		}
	});

	Apps.on('start', function(){
		new router.Router({
			controller: new router.Controller
		});
	});

	Apps.Router = router

});
