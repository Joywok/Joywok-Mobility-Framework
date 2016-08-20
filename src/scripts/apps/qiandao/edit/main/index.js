/*
 * 主文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Qiandao.Edit', function(Edit, Jma, Backbone, Marionette, $, _) {
    Edit.Controller = Marionette.Controller.extend({
        initialize: function(options) {
        	this.options = options;
			console.log('Qiandao.');
            this.show();
        },
        show: function() {
           //  var editview=new Jma.Edit.Views.EditLayoutView;
           //   Jma.mainRegion.show(editview);

           //  var model = new Backbone.Model({               // dates:SPMS_GV.systime
           //  });
           //  var form = Jma.Components.Form;
           //  var datepicker = new form.editors.DatePickerCheck({
           //      model: model,
           //      key: 'dates',
           //      weekStart: 1,
           //      // schema: {
           //      //     editorAttrs: { readonly: "readonly" },
           //      //     template: Jma.Edit.Templates.RecordTemplate
           //      // }
           //  });
           // this.editview.dateRegion.show(datepicker);
        }
    });

    Edit.StartApp = function(options) {
        Edit.Controllers = new Edit.Controller(options);
    };

    Edit.StopApp = function(options) {
        console.log('stop');
    };

})
