
/*
* 视图文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao',function(Qiandao, Jma, Backbone, Marionette, $, _){
    var Views = {};
    Qiandao.Views = Views;

    Views.loadingView = Marionette.ItemView.extend({
    	className:'loadingView-w',
    	template:Qiandao.Templates.loadingViewTemplate
    })

    Views.emptyView = Marionette.ItemView.extend({
    	template:Qiandao.Templates.emptyViewTemplate
    })

    Views.LayoutView = Marionette.LayoutView.extend({
    	template:Qiandao.Templates.LayoutViewTemplate,
    	onShow:function(){
    		this.addRegions({list:this.$el.find('.qiandao-w')})
    	}
    })
})
