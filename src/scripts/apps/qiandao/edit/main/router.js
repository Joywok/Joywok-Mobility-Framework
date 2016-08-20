
/*
* 路由文件
* createDate:2016-08-20 11:10:48
* author: XXXXXX
*/
Jma.module('Edit.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			// 'apps/qiandao/edit':'edit',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		edit: function(){
			//console.log('edit')
			// Jma.module('Qiandao.Edit').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
