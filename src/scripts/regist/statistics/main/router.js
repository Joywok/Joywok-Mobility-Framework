
/*
* 路由文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Statistics.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist/statistics':'statistics',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		statistics: function(){
			//console.log('statistics')
			Jma.module('Regist.Statistics').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
