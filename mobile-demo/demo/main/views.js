
/*
* 视图文件
* createDate:2016-10-13 14:47:10
* author: XXXXXX
*/
Jma.module('Demo.Views',function(Views, Jma, Backbone, Marionette, $, _){



	Views.layoutView = Marionette.LayoutView.extend({
	  className:'mobile-list',
    template:Jma.Demo.Templates.Layout,
    onShow:function(){
	    this.addRegions({
	      listRegion:this.$el.find('.mobile-list-c')
      })
    }
  })

  Views.itemView = Marionette.ItemView.extend({
    className:'list-block',
    template:Jma.Demo.Templates.ItemView,
    templateHelpers:function(){
      return {
        initHeader:function(){
          return this.value;
        },
        initChildList:function(){
          if(this.child && this.child.length!=0){
            return (_.map(this.child,function(item){
                     return '<div class="list-item">\
                               <a href="#demo/info?type='+item["id"]+'">\
                                 <div class="list-item-w">\
                                   <i class="fa fa-angle-right"></i>\
                                   <label>'+(item["value"])+'</label>\
                                 </div>\
                               </a>\
                             </div>'
                 }).join(''))
          }else{
            return ''
          }
        }
      }
    }
  })
  Views.collectionView = Marionette.CollectionView.extend({
    className:'list-w',
    childView:Views.itemView
  })
})
