
/*
* 路由文件
* createDate:2016-08-29 10:53:30
* author: XXXXXX
*/
Jma.module('Punch.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist/punch':'punch',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		punch: function(){
			//console.log('punch')
			Jma.module('Regist.Punch').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
