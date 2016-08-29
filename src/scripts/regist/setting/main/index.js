
/*
* 主文件
* createDate:2016-08-29 10:53:39
* author: XXXXXX
*/
Jma.module('Regist.Setting', function(Setting, Jma, Backbone, Marionette, $, _){

	Setting.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Regist.Setting');
		},
	});

	Setting.StartApp =  function(options){
		Setting.Controllers = new Setting.Controller(options);
	};

	Setting.StopApp = function(options){
		console.log('stop');
	};

})
