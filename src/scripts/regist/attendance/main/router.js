
/*
* 路由文件
* createDate:2016-08-29 10:53:30
* author: XXXXXX
*/
Jma.module('Attendance.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'regist/Attendance':'Attendance',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		Attendance: function(){
			//console.log('Attendance')
			Jma.module('Regist.Attendance').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});
