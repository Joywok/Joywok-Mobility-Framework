
/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Ehr.module('Apps.registCenter.Router', function(Router, Ehr, Backbone, Marionette, $, _){

	// Router.startWithParent = true;

	Router.Router = Ehr.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		registCenter: function(){
			Ehr.module('Apps.registCenter').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
