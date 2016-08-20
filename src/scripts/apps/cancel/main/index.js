/*
 * 主文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Cancel', function(Cancel, Jma, Backbone, Marionette, $, _) {

    Cancel.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('PersonalInfo.Cancel');
            this.model = new Jma.Cancel.Entities.Model();
            this.view = new Jma.Cancel.Views.CancelView({
                model: this.model
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    Cancel.StartApp = function(options) {
        Cancel.Controllers = new Cancel.Controller(options);
    };
    Cancel.StopApp = function(options) {
        console.log('stop');
    };

})
