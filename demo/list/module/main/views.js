
/*
* 视图文件
* createDate:2016-10-09  9:19:44
* author: XXXXXX
*/
Jma.module('Demo.Views',function(Views, Jma, Backbone, Marionette, $, _){


  Views.LayoutView = Marionette.LayoutView.extend({
    className:'layout-view',
    template:Jma.Demo.Templates.Layout,
    onShow:function(){
      this.addRegions({listRegion:this.$el.find('.layout-list'),opearRegion:this.$el.find('.header-opear'),infoRegion:this.$el.find('.header-info')})
    }
  })


  Views.EmptyView = Marionette.ItemView.extend({
  	className:'empty-view',
  	template:Jma.Demo.Templates.EmptyView
  })
  Views.ItemView = Marionette.ItemView.extend({
  	className:'list-item',
  	template:Jma.Demo.Templates.ItemView,
  	templateHelpers:function(){
  		return {
  			initValue:function(){
  				return this.value;
  			}
  		}
  	}
  })

  Views.ListView = Marionette.CollectionView.extend({
  	className:'layout-list-w',
  	childView:Views.ItemView,
  	emptyView:Views.EmptyView
  })

})
