/*
 * 主文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Regist.Attendance', function(Attendance, Jma, Backbone, Marionette, $, _) {
    Attendance.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('Regist.Attendance');
            var self = this;
            this.layoutView = new Jma.Attendance.Views.AttendanceLayoutView();
            this.renderLayout();
            Jma.mainRegion.show(this.layoutView);
        },
        renderLayout: function() {
            var self = this;
            this.collection = new Jma.Attendance.Entities.recordCollection();
            this.layoutView.on('show', function() {
                self.collection.fetch({
                    success: function(collection, resp) {
                        self.recordCollectionView = new Jma.Attendance.Views.recordCollectionView({
                            collection: self.collection
                        });
                        self.layoutView.AttendanceRecord.show(self.recordCollectionView);
                        // 根据上次打卡类型设置下次打卡
                        if (self.collection.models[self.collection.length - 1]) {
                            this.type = self.collection.models[self.collection.length - 1].get('type') == "1" ? '2' : '1';
                        } else {
                            this.type = "1";
                        }
                        self.renderBtn(type);
                    }
                });
                self.renderForm();
                self.renderPersonInfo();
            })
        },
        renderPersonInfo: function() {
            var self = this;
            this.model = new Jma.Attendance.Entities.personModel();
            this.model.fetch({
                success: function(model, resp) {
                    self.personInfoView = new Jma.Attendance.Views.personItemView({
                        model: self.model
                    });
                    self.layoutView.personInfo.show(self.personInfoView);
                }
            })
        },
        renderForm: function() {
            // var form = new Jma.Components.Form.editors.Date({
            //     model: new Jma.Attendance.Entities.formModel(),
            //     key: 'date',
            //     schema: {
            //         editorAttrs: { readonly: "readonly" }
            //     }
            // });
            // this.layoutView.date.show(form);
             var form = new Jma.Components.Form.editors.calendarPicker({
                model: new Jma.Attendance.Entities.formModel(),
                key: 'date',
                schema: {
                    editorAttrs: { readonly: "readonly" }
                }
            });
            this.layoutView.date.show(form);
        },
        // 更新打卡按钮
        renderBtn: function(type) {
            //设置打卡更新信息model
            var self = this;
            this.Model = new Jma.Attendance.Entities.itemModel({
                time: parseInt((new Date()).getTime()),
                type: type,
                location: "定位中......"
            });
            setInterval(function() {
                var newTime = parseInt((new Date()).getTime());
                self.Model.set('time', newTime);
            }, 1000);
            var AttendanceActionView = new Jma.Attendance.Views.AttendanceActionView({
                model: this.Model
            })
            this.layoutView.AttendanceAction.show(AttendanceActionView);
            this.Model.bind('sync', function(Model, resp) {
                self.collection.add(self.Model);
                self.recordCollectionView.render();
                this.type = self.collection.models[self.collection.length - 1].get('type') == "1" ? '2' : '1';
                self.renderBtn(this.type);
            });
        }
    });
    Attendance.StartApp = function(options) {
        Attendance.Controllers = new Attendance.Controller(options);
    };
    Attendance.StopApp = function(options) {
        console.log('stop');
    };

})
