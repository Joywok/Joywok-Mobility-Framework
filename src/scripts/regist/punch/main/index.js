
/*
* 主文件
* createDate:2016-08-29 10:53:30
* author: XXXXXX
*/
Jma.module('Regist.Punch', function(Punch, Jma, Backbone, Marionette, $, _){

	Punch.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Regist.Punch');
		},
	});

	Punch.StartApp =  function(options){
		Punch.Controllers = new Punch.Controller(options);
	};

	Punch.StopApp = function(options){
		console.log('stop');
	};

})
