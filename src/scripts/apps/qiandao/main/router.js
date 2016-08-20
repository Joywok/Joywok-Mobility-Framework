
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
			'qiandao/info':'info',
			'apps/qiandao/edit':'edit',
		}
	});

	router.Controller = Marionette.Controller.extend({
		info: function(){
			console.log('qiandao--info')
		},
		edit:function(){
			Jma.module('Qiandao.Edit').StartApp();
		}
	});

	Qiandao.on('start', function(){
		new router.Router({
			controller: new router.Controller
		});
	});

	Qiandao.Router = router;

});
