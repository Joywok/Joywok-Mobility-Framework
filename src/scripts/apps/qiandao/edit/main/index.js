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
            this.model = new  Jma.Edit.Entities.model();
            this.layoutview = new Jma.Edit.Views.EditLayoutView({model:this.model});
            // this.collection = new Jma.Edit.Entities.Collection();
            var form = Jma.Components.Form;
         
            var datepicker = new form.editors.DatePickerCheck({
                model: this.model,
                key: "date"
            });
            datepicker.on('date:change',function(){
                console.log(this,'123123');
                // self.collection.fetchData({stamp:this.startTime});
            })
            this.layoutview.on('show', function() {
                this.dateRegion.show(datepicker);
                // this.textRegion.show(EditWord);

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
