/*
 * 视图文件
 * createDate:2016-08-29 10:53:39
 * author: XXXXXX
 */
Jma.module('Setting.Views', function(Views, Jma, Backbone, Marionette, $, _) {


    Views.LayoutView = Marionette.LayoutView.extend({
        template: Jma.Setting.Templates.LayoutTemplate,
        regions: {
            add: '.add'
        },
        onShow: function() {
            this.addRegions({ add: this.$el.find('.add') })
        }
    })

    Views.itemView=Marionette.ItemView.extend({
        template:Jma.Setting.Templates.itemTemplate,
        events:{
            'click .add-group':'showAdd'
        },
        showAdd:function(){
          Jma.module('Setting.Addgroup').StartApp();
       }
    })
})
