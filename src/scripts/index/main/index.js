/*
 * 主文件
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
Ehr.module('Regist', function(Regist, Ehr, Backbone, Marionette, $, _) {

    Regist.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('Regist');
            this.registmodel = new Ehr.Regist.Entities.Model();
            this.view = new Ehr.Regist.Views.registView({
                model: this.registmodel
            });
            this.show();
        },
        show: function() {
            var self = this;
            Ehr.mainRegion.show(self.view);
        }
    });
    Regist.StartApp = function(options) {
        Regist.Controllers = new Regist.Controller(options);
    };
    Regist.StopApp = function(options) {
        console.log('stop');
    };

})
