
/*
* 主文件
* createDate:2016-08-20 10:25:51
* author: XXXXXX
*/
Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _){
	Apps.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			this.layoutView = new Apps.Views.LayoutView();

			this.layoutView.on('show',function(){
			})

			Jma.mainRegion.show(this.layoutView)
		},
	});
	Apps.StartApp =  function(options){
		Apps.Controllers = new Apps.Controller(options);
	};
	Apps.StopApp = function(options){
		console.log('stop');
	};

})
