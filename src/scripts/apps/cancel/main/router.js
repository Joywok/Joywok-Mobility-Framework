
/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Apps.Cancel.Router', function(Router, Jma, Backbone, Marionette, $, _){

	// Router.startWithParent = false;

	Router.Router = Jma.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		Cancel: function(){
			Jma.module('Apps.Cancel').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
