
/*
* 主文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test', function(Test, Jma, Backbone, Marionette, $, _){

	Test.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Test');
		},
	});

	Test.StartApp =  function(options){
		Test.Controllers = new Test.Controller(options);
	};

	Test.StopApp = function(options){
		console.log('stop');
	};

})
