
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
			'regist/punch':'punch',
			'regist/setting':'setting',
			'regist/statistics':'statistics'
		}
	});

	Router.Controller = Marionette.Controller.extend({
		regist: function(){
			Jma.module('Regist').StartApp();
		},
		punch: function(){
			Jma.module('Regist.Punch').StartApp();
		},
		setting: function(){
			Jma.module('Regist.Setting').StartApp();
		},
		statistics: function(){
			Jma.module('Regist.Statistics').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
