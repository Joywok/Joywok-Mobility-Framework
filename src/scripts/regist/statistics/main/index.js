
/*
* 主文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Regist.Statistics', function(Statistics, Jma, Backbone, Marionette, $, _){

	Statistics.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Regist.Statistics');
		},
	});

	Statistics.StartApp =  function(options){
		Statistics.Controllers = new Statistics.Controller(options);
	};

	Statistics.StopApp = function(options){
		console.log('stop');
	};

})
