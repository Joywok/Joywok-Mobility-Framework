
/*
* 路由文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){

	Qiandao.startWithParent = true;

	var router = {};


	router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'qiandao':'qiandao',
		}
	});

	router.Controller = Marionette.Controller.extend({
		qiandao: function(){
			//console.log('qiandao')
			Jma.module('Apps.Qiandao').StartApp();
		}
	});

	Qiandao.on('start', function(){
		new router.Router({
			controller: new router.Controller
		});
	});

	Qiandao.Router = router;

});
