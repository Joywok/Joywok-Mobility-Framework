
/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Ehr.module('Apps.Post.Router', function(Router, Ehr, Backbone, Marionette, $, _){

	// Router.startWithParent = false;

	Router.Router = Ehr.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		Post: function(){
			Ehr.module('Apps.Post').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
