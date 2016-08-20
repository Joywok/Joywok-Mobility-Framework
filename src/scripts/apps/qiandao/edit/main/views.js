
/*
* 视图文件
* createDate:2016-08-20 11:10:48
* author: XXXXXX
*/
Jma.module('Edit.Views',function(Views, Jma, Backbone, Marionette, $, _){

	Views.EditLayoutView = Marionette.LayoutView.extend({
		className: 'edit-content',
		template:   Jma.Edit.Templates.EditTemplate,
		regions: {
			dateRegion : '#qiandaoDate',
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
