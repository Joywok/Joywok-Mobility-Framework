
/*
* 路由文件
* createDate:2016-08-20 11:10:45
* author: XXXXXX
*/
Jma.module('List.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'apps/qiandao/list':'list',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		list: function(){
			//console.log('list')
			Jma.module('Qiandao.List').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
