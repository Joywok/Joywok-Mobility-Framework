
/*
* 路由文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Ehr.module('Demo.Router', function(Router, Ehr, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Ehr.AppRouter.extend({
		appRoutes:{
			'demo':'demo',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		demo: function(){
			//console.log('demo')
			Ehr.module('Demo').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
