
/*
* 主文件
* createDate:2016-10-09 21:14:14
* author: XXXXXX
*/
Jma.module('Demo.Info', function(Info, Jma, Backbone, Marionette, $, _){

	Info.Controller = Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.options = options;
			console.log('Demo.Info',Jma);
			var loading = new Jma.Loading.main({
       region:Jma.mainRegion.$el,
       value:'加载中…',
       specailClassName:'xxxx',
       type:1
      });
      this.model = new Jma.Info.Entities.model({
      	user:{
      		id:'北京'
      	},
      	content:'10000'
      })
      setTimeout(function(){
      	self.layoutview = new Jma.Info.Views.layoutView();
      	self.layoutview.on('show',function(){
      		self.cardView = new Jma.Info.Views.CardView({
      			model:self.model
      		})
      		self.layoutview.cardRegion.show(self.cardView)

      		self.infoView = new Jma.Info.Views.InfoView({
      			model:self.model
      		})
      		self.layoutview.dataRegion.show(self.infoView)
      	})
				Jma.mainRegion.show(self.layoutview)
      },500)
		},
	});

	Info.StartApp =  function(options){
		Info.Controllers = new Info.Controller(options);
	};

	Info.StopApp = function(options){
		console.log('stop');
	};

})
