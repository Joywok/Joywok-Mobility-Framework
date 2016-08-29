
/*
* 主文件
* createDate:2016-08-29 10:53:20
* author: XXXXXX
*/
Jma.module('Regist', function(Regist, Jma, Backbone, Marionette, $, _){

	Regist.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Regist');
		},
	});

	Regist.StartApp =  function(options){
		Regist.Controllers = new Regist.Controller(options);
	};

	Regist.StopApp = function(options){
		console.log('stop');
	};

})
