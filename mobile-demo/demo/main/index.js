
/*
* 主文件
* createDate:2016-10-13 14:47:10
* author: XXXXXX
*/
Jma.module('Demo', function(Demo, Jma, Backbone, Marionette, $, _){

	Demo.Controller = Marionette.Controller.extend({
		initialize: function(options){
		  var self = this;
			this.options = options;
			this.layout = new Demo.Views.layoutView();
      var data = [
        {id:'id-1',value:'Components',child:[
          {id:'input',value:'Input'},
          {id:'textarea',value:'Textarea'},
          {id:'select',value:'Select'},
          {id:'toggle',value:'Toggle'},
          {id:'checkbox',value:'Checkbox'},
          {id:'radio',value:'Radio'},
          {id:'date',value:'Date'},
          {id:'dialog',value:'Dialog'},
          {id:'loading',value:'Loading'}
        ]},
        {id:'id-2',value:'UI',child:[
          {id:'ui-card',value:'Card'},
          {id:'ui-tabs',value:'Tabs'},
          {id:'ui-action-sheet',value:'Action'},
        ]}
      ];
      this.collection = new Backbone.Collection(data);
      this.layout.on('show',function(){
        // self.collection.
        self.listView = new Demo.Views.collectionView({
          collection:self.collection
        })
        this.listRegion.show(self.listView)
      })
      Jma.mainRegion.show(this.layout)
		},
	});

	Demo.StartApp =  function(options){
		Demo.Controllers = new Demo.Controller(options);
	};

	Demo.StopApp = function(options){
		console.log('stop');
	};

})
