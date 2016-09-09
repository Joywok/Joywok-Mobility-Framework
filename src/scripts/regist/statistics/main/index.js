
/*
* 主文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Regist.Statistics', function(Statistics, Jma, Backbone, Marionette, $, _){

	Statistics.Controller = Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.options = options;
			this.model = new Backbone.Model({date:new Date().getMonth()+1})
			this.collection = new Statistics.Entities.Collection();
			this.layoutView = new Statistics.View.LayoutView();
			this.layoutView.on('show',function(){
				this.container.show(new Statistics.View.loadingView());
				self.collection.fetch({success:function(collection,resp){
					self.listView = new Statistics.View.listView({
						collection:self.collection
					})
					var form = new Jma.Components.Form.editors.FormSelect({
			      model:self.model,
			      key:'date',
			      schema:{
			        editorAttrs:{readonly:"readonly"},
			        list:[
			            {key:1,val:'2016-01'},
			            {key:2,val:'2016-02'},
			            {key:3,val:'2016-03'},
			            {key:4,val:'2016-04'},
			            {key:5,val:'2016-05'},
			            {key:6,val:'2016-06'},
			            {key:7,val:'2016-07'},
			            {key:8,val:'2016-08'},
			            {key:9,val:'2016-09'},
			            {key:10,val:'2016-10'},
			            {key:11,val:'2016-11'},
			            {key:12,val:'2016-12'}
			          ]
			      }
			    })
					self.layoutView.date.show(form)
					self.layoutView.container.show(self.listView);
				}})
			})
			Jma.mainRegion.show(this.layoutView)
			
		},
	});

	Statistics.StartApp =  function(options){
		Statistics.Controllers = new Statistics.Controller(options);
	};

	Statistics.StopApp = function(options){
		console.log('stop');
	};

})
