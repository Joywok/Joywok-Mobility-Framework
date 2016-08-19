/*
 * 主文件
 * createDate:2016-08-16 15:50:55
 * author: XXXXXX
 */
Ehr.module('registCenter', function(registCenter, Ehr, Backbone, Marionette, $, _) {

    registCenter.Controller = Marionette.Controller.extend({
        initialize: function(options) {
        	this.options=options;
            this.registmodel = new Ehr.registCenter.Entities.Model();
            this.view = new Ehr.registCenter.Views.registView({
                model: this.registmodel
            });
            this.show();
        },
        show: function() {
            var self = this;
            Ehr.mainRegion.show(self.view);
        }
    });
    registCenter.StartApp = function(options) {
    	console.log(123);
        registCenter.Controllers = new registCenter.Controller(options);
    };
    registCenter.StopApp = function(options) {
        console.log('stop');
    };
})
