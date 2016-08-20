/*
 * 主文件
 * createDate:2016-08-16 15:50:31
 * author: XXXXXX
 */
// Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _) {

//     Apps.Controller = Marionette.Controller.extend({
//         initialize: function(options) {
//             this.options = options;
//             console.log('Apps');
//             this.headermodel = new Jma.Apps.Entities.Model();
//             this.view = new Jma.Apps.Views.HeaderItem({
//                 model: this.headermodel
//             });
//             this.show();
//         },
//         show: function() {
//             var self = this;
//             Jma.headerRegion.show(self.view);
//         }
//     });
//     Apps.StartApp = function(options) {
//         Apps.Controllers = new Apps.Controller(options);
//     };
//     Apps.StopApp = function(options) {
//         console.log('stop');
//     };

// })



Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _) {
    Apps.Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.options = options;
            this.changeApp();
        },
         events:{
            'click .wrap':'tranform'
         },
         tranform:function(){
            $(".wrap").addClass("bar-active").siblings().removeClass('bar-active')
         },
        changeApp: function(options) {
            if (options) this.options = options;
            this.HeaderItem = new Jma.Apps.Views.HeaderItem();
            Jma.headerRegion.show(this.HeaderItem);
        }

    });
    Apps.StartApp = function(options) {
        Apps.Controllers = new Apps.Controller(options);
    };
    Apps.StopApp = function(options) {
        console.log('stop');
    };
})
