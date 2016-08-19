
/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Ehr.module('Apps.Cancel.Router', function(Router, Ehr, Backbone, Marionette, $, _){

	// Router.startWithParent = false;

	Router.Router = Ehr.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		Cancel: function(){
			Ehr.module('Apps.Cancel').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
