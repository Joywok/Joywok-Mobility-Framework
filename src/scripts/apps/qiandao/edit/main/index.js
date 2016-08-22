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
            this.model = new Jma.Edit.Entities.model();
            this.layoutview = new Jma.Edit.Views.EditLayoutView({ model: this.model });

            var datepicker = new Jma.Components.Form({
                model: this.model,
                key: "date",
                template:Jma.Edit.Templates.EditDateTemplate,
                 schema: {
                    date: { title: '日期', type: 'DatePicker' }
                },
            });     
            var EditWord = new Jma.Components.Form({
                key: 'content',
                template: Jma.Edit.Templates.EditWord_template,
                schema: {
                    content: { title: '留言', type: 'TextArea',validators:['required'] }
                },
                model: this.model
            });
            this.layoutview.on('save',function(){
                datepicker.commit();
                EditWord.commit();
                self.model.save()
            })
            this.layoutview.on('show', function() {
                this.dateRegion.show(datepicker);
                this.textRegion.show(EditWord);
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
