/*
 * 主文件
 * createDate:2016-08-29 10:53:39
 * author: XXXXXX
 */
Jma.module('Regist.Setting', function(Setting, Jma, Backbone, Marionette, $, _) {

    Setting.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            var self = this;
            console.log('Regist.Setting');
            this.layoutView = new Jma.Setting.Views.LayoutView();
            this.model = new Backbone.Model();
            this.layoutView.on('show', function() {
                var itemview=new Jma.Setting.Views.itemView();
                self.layoutView.add.show(itemview);
            })
            Jma.mainRegion.show(this.layoutView);
            
        },
    });
    Setting.StartApp = function(options) {
        Setting.Controllers = new Setting.Controller(options);
    };
    Setting.StopApp = function(options){
        console.log('stop');
    };
})
