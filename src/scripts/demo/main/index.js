
/*
* 主文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Ehr.module('Demo', function(Demo, Ehr, Backbone, Marionette, $, _){

	Demo.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Demo');
		},
	});

	Demo.StartApp =  function(options){
		Demo.Controllers = new Demo.Controller(options);
	};

	Demo.StopApp = function(options){
		console.log('stop');
	};

})
