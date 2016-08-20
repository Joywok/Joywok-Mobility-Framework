
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
			this.loadingView = new Qiandao.Views.loadingView({
			})
			this.layoutview = new Qiandao.Views.LayoutView();

			this.collection = new Qiandao.Entities.Collection()

			this.layoutview.on('show',function(){
				this.list.show(self.loadingView);
				self.collection.fetch({success:function(collection,resp){
					self.listView = new Qiandao.Views.ListView({
						collection:self.collection
					})
					self.list.show(self.listView)
				}})
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
