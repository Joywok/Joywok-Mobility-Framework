
/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Apps.registCenter.Router', function(Router, Jma, Backbone, Marionette, $, _){

	// Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		registCenter: function(){
			Jma.module('Apps.registCenter').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
