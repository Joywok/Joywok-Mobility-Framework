
/*
* 视图文件
* createDate:2016-10-13 14:47:15
* author: XXXXXX
*/
Jma.module('Info.Views',function(Views, Jma, Backbone, Marionette, $, _){
  Views.LayoutView = Marionette.LayoutView.extend({
    className:'list-info',
    template:Jma.Info.Templates.LayoutView,
    templateHelpers:function(){
      return {
        initHeader:function(){
          var data = this.type.slice(0,1).toUpperCase();
          var aaa = data+this.type.slice(1);
          return aaa;
        }
      }
    },
    onShow:function(){
      this.addRegions({
        main:this.$el.find('.list-info-main')
      })
    }
  })
})
