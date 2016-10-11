
/*
* 主文件
* createDate:2016-10-09  9:19:44
* author: XXXXXX
*/
Jma.module('Demo', function(Demo, Jma, Backbone, Marionette, $, _){

	Demo.Controller = Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.options = options;
			/*****************
			*****假数据伪造*****
			*****************/
			var data = {
				user:{
					name:'Zhai lei',
					dept:'前端开发'
				},
				list:[
          {id:'北京',value:'10000'},
          {id:'上海',value:'20000'},
          {id:'南京',value:'30000'},
          {id:'杭州',value:'40000'},
          {id:'天津',value:'50000'},
          {id:'深证',value:'60000'},
          {id:'广州',value:'70000'},
          {id:'香港',value:'80000'}
        ]
			}
			var loading = new Jma.Loading.main({
       region:Jma.mainRegion.$el,
       value:'加载中…',
       specailClassName:'xxxx',
       type:1
      });
			this.model = new Demo.Entities.model();
			/*****************
			*****假数据请求*****
			*****************/
			// this.model.fetch({success:function(model,resp){}})
			setTimeout(function(){
				self.model.set(data);
				self.collection = new Demo.Entities.ListCollection(self.model.get('list'));
				self.layout = new Jma.Demo.Views.LayoutView({
					mode:self.model
				});
				self.layout.on('show',function(){
					var OpearModel = new Backbone.Model();
					OpearModel.bind('change',function(){
						self.layout.listRegion.$el.html('');
						var loading = new Jma.Loading.main({
			       region:self.layout.listRegion.$el,
			       value:'加载中…',
			       specailClassName:'xxxx',
			       type:1
			      });
			      setTimeout(function(){
			      	self.listView = new Demo.Views.ListView({
								collection:self.collection
							})
			      	self.layout.listRegion.show(self.listView)
			      },500)
					})
		  		self.opearForm = new Jma.Components.Form.editors.Date({
						model: OpearModel,
						key: 'date',
						schema: {
							editorAttrs: { readonly: "readonly" }
						}
					})

					this.opearRegion.show(self.opearForm)
					self.listView = new Demo.Views.ListView({
						collection:self.collection
					})
					this.listRegion.show(self.listView)
				})
				Jma.mainRegion.show(self.layout)
			},500)
		}
	});

	Demo.StartApp =  function(options){
		Demo.Controllers = new Demo.Controller(options);
	};

	Demo.StopApp = function(options){
		console.log('stop');
	};

})
