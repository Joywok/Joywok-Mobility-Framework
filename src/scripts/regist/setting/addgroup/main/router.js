
/*
* 路由文件
* createDate:2016-09-07 12:00:15
* author: XXXXXX
*/
Jma.module('Addgroup.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist/setting/addgroup':'addgroup',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		addgroup: function(){
			//console.log('addgroup')
			Jma.module('Setting.Addgroup').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
