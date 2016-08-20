
/*
* 主文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Apps.Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){

	Qiandao.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Apps.Qiandao');
		},
	});

	Qiandao.StartApp =  function(options){
		Qiandao.Controllers = new Qiandao.Controller(options);
	};

	Qiandao.StopApp = function(options){
		console.log('stop');
	};

})
