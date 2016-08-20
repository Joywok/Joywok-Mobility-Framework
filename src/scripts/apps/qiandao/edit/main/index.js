/*
 * 主文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Qiandao.Edit', function(Edit, Jma, Backbone, Marionette, $, _) {
    Edit.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            var self = this;
            this.options = options;
            this.layoutview = new Jma.Edit.Views.EditLayoutView();
            this.collection = new Jma.Edit.Entities.Collection();
            var form = Jma.Components.Form;
            var model = new Backbone.Model({
                schema: {
                    birthday: { title: 'When were you born', type: 'DatePickerCheck' }
                }
            });
            var datepicker = new form.editors.DatePickerCheck({
                  schema: {
                    birthday: { title: 'When were you born', type: 'DatePickerCheck' }
                }

            });
            this.layoutview.on('show', function() {
                this.dateRegion.show(datepicker);
            });
            Jma.mainRegion.show(this.layoutview)
            console.log('Qiandao.Edit');
        }
    });

    Edit.StartApp = function(options) {
        Edit.Controllers = new Edit.Controller(options);
    };

    Edit.StopApp = function(options) {
        console.log('stop');
    };

})
