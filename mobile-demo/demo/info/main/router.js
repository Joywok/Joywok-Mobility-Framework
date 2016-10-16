
/*
* 路由文件
* createDate:2016-10-13 14:47:15
* author: XXXXXX
*/
Jma.module('Info.Router', function(Router, Jma, Backbone, Marionette, $, _){
	Router.startWithParent = true;
	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'demo/info':'info'
		}
	});
	Router.Controller = Marionette.Controller.extend({
		info: function(datas){
      var data = {
        type:datas.split('=')[1]
      }
			Jma.module('Demo.Info').StartApp(data);
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
