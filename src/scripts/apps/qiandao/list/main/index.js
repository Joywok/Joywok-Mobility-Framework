
/*
* 主文件
* createDate:2016-08-20 11:10:45
* author: XXXXXX
*/
Jma.module('Qiandao.List', function(List, Jma, Backbone, Marionette, $, _){

	List.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Qiandao.List');
		},
	});

	List.StartApp =  function(options){
		List.Controllers = new List.Controller(options);
	};

	List.StopApp = function(options){
		console.log('stop');
	};

})
