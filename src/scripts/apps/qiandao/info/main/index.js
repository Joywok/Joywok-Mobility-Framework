
/*
* 主文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info', function(Info, Jma, Backbone, Marionette, $, _){

	Info.Controller = Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.options = options;
			this.model = new Info.Entities.model({
				id:options['id']
			});
			this.loadingView = new Jma.Qiandao.Views.loadingView();
			console.log(this.loadingView,'123');
			this.layoutview = new Info.Views.LayoutView();
			this.layoutview.on('show',function(){
				this.container.show(self.loadingView);
				self.model.fetch({success:function(model,resp){
					self.infoView = new Info.Views.InfoView({
						model:self.model
					})
					self.layoutview.container.show(self.infoView)
				}})	
			})
			Jma.mainRegion.show(this.layoutview)
		},
	});

	Info.StartApp =  function(options){
		Info.Controllers = new Info.Controller(options);
	};

	Info.StopApp = function(options){
		console.log('stop');
	};

})
