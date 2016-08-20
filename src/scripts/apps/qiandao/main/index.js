
/*
* 主文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){
	Qiandao.Controller = Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.options = options;
			this.loadingView = new Qiandao.Views.loadingView()
			this.layoutview = new Qiandao.Views.LayoutView();
			console.log(this.loadingView,'123');
			this.layoutview.on('show',function(){
				console.log(this.list)
				this.list.show(self.loadingView)
			})


			Jma.mainRegion.show(this.layoutview)
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
