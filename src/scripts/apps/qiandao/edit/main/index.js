
/*
* 主文件
* createDate:2016-08-20 11:10:48
* author: XXXXXX
*/
Jma.module('Qiandao.Edit', function(Edit, Jma, Backbone, Marionette, $, _){

	Edit.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Qiandao.Edit');
		},
	});

	Edit.StartApp =  function(options){
		Edit.Controllers = new Edit.Controller(options);
	};

	Edit.StopApp = function(options){
		console.log('stop');
	};

})
