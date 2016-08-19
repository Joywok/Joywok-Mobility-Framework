
/*
* 路由文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Ehr.module('Test.Router', function(Router, Ehr, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Ehr.AppRouter.extend({
		appRoutes:{
			'test':'test',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		test: function(){
			//console.log('test')
			Ehr.module('Test').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
