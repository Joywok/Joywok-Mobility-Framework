
/*
* 字典文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.demoModel = Backbone.Model.extend({
		urlRoot : 'urlPath',
		parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

	Entities.demoCollection = Backbone.Collection.extend({
		url : 'urlPath',
		model:Entities.demoModel,parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

})


/*
* 主文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo', function(Demo, Jma, Backbone, Marionette, $, _){

	Demo.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Demo');
		},
	});

	Demo.StartApp =  function(options){
		Demo.Controllers = new Demo.Controller(options);
	};

	Demo.StopApp = function(options){
		console.log('stop');
	};

})


/*
* 路由文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'demo':'demo',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		demo: function(){
			//console.log('demo')
			Jma.module('Demo').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});


/*
* 模板文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.testTemplate = _.template('<div class="list">\
                <div class="list-h"></div>\
                  <div class="list-w">\
                    <div class="list-block">\
                     <div class="list-block-h"></div>\
                     <div class="list-block-w">\
                       <div class="list-item list-item-icon">\
                          <i class="icon icon-address active"></i>\
                          <div  class="list-item-w">\
                            <div class="list-item-val ellipsis"><span id="weekday" style="display:inline-block;width:10%"></span><span style="display:inline-block;text-align:center;width:90%" type="date" id="riqi"></span></div>\
                          </div>\
                        </div>\
                     </div>\
                    </div>\
                  </div>\
               </div>');

});


/*
* 视图文件
* createDate:2016-08-09 15:54:08
* author: XXXXXX
*/
Jma.module('Demo.Views',function(Views, Jma, Backbone, Marionette, $, _){

	Views.demoLayoutView = Marionette.LayoutView.extend({
		className: 'main-content',
		template: 'template',
		regions: {
			demoRegion : '#demo',
		},
        triggers:{
            'click .demo' : 'demo',
        },
        events: {
            'click .demo' : 'demo'
        },
        demo: function(){
        	console.log('demo for events function')
        }
    });

	Views.demomItemView = Marionette.ItemView.extend({
		template: 'template',
		initialize: function(){},
		getTemplate: function(){
			return '返回逻辑模板';
		},
		templateHelpers: function(){
            var self = this;
            return {
                demo: function(){
                	return 'value';
                }
            };
        },
		onRender: function(){},
		modelEvents: {
            'change': 'render',
        },
        triggers: {
            'change': 'render',
        }
	});

	Views.demomCollectionView = Marionette.CollectionView.extend({
		template: 'template',
		tagName: 'div',
        className: 'classname',
        childView: Views.demomItemView,
        emptyView: Views.demoEmptyView,
        triggers:{
            'change': 'render',
        }
	});

})
