
/*
* 视图文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao',function(Qiandao, Jma, Backbone, Marionette, $, _){
    var Views = {};
    Qiandao.Views = Views;

    Views.loadingView = Marionette.ItemView.extend({
    	template:Qiandao.Templates.loadingViewTemplate
    })

    Views.emptyView = Marionette.ItemView.extend({
    	template:Qiandao.Templates.emptyViewTemplate
    })

    Views.LayoutView = Marionette.LayoutView.extend({
    	template:Qiandao.Templates.LayoutViewTemplate,
    	regions:{
				list:'.qiandao-w'
			},
    	onShow:function(){
    		this.addRegions({list:this.$el.find('.qiandao-w')})
    	}
    })

    Views.ChildView = Marionette.ItemView.extend({
    	className:'qiandao-list-item',
    	template:Qiandao.Templates.ChildViewTemplate,
    	templateHelpers:function(){
    		return {
    			initContent:function(){
    				return this.content
    			},
    			initTime:function(){
    				return this.date
    			}
    		}
    	}
    })

    Views.ListView = Marionette.CollectionView.extend({
    	template:Qiandao.Templates.CollectionViewTemplate,
    	childView:Views.ChildView,
    	childViewContainer:'qiandao-c'
    })
})
