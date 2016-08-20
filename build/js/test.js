
/*
* 字典文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

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
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test', function(Test, Jma, Backbone, Marionette, $, _){

	Test.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('Test');
		},
	});

	Test.StartApp =  function(options){
		Test.Controllers = new Test.Controller(options);
	};

	Test.StopApp = function(options){
		console.log('stop');
	};

})


/*
* 路由文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'test':'test',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		test: function(){
			//console.log('test')
			Jma.module('Test').StartApp();
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
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.testTemplate = _.template('html代码');

});


/*
* 视图文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Views',function(Views, Jma, Backbone, Marionette, $, _){

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
