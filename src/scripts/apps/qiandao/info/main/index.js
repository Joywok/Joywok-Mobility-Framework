
/*
* 主文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info', function(Info, Jma, Backbone, Marionette, $, _){

	Info.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Qiandao.Info');
		},
	});

	Info.StartApp =  function(options){
		Info.Controllers = new Info.Controller(options);
	};

	Info.StopApp = function(options){
		console.log('stop');
	};

})
