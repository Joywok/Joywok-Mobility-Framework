/*
 * 主文件
 * createDate:2016-09-07 12:00:15
 * author: XXXXXX
 */
Jma.module('Setting.Addgroup', function(Addgroup, Jma, Backbone, Marionette, $, _) {

    Addgroup.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('Setting.Addgroup');
            var self = this;
            this.addView = $('<div class="add-container"></div>');
            var addRegion = new Marionette.Region({
                el: this.addView
            })
            this.layoutview = new Jma.Addgroup.Views.LayoutView({});
            $('body').append(this.addView);
            this.layoutrender();
            addRegion.show(this.layoutview);
        },
        layoutrender: function() {
            var self = this;
            self.layoutview.on('show', function() {
                self.selectMemberRender();
                self.selectWorkSystemRender();
                self.moreSettingRender();
            })

        },
        // 选择考勤人员
        selectMemberRender: function() {
            var self = this;
            this.model = new Jma.Addgroup.Entities.selectUser_commectionModel();
            this.form = new Jma.Components.Form.editors.selectUser({
                model: this.model
            });
            this.layoutview.selectMember.show(this.form);
        },
        // 选择上班制度
        selectWorkSystemRender: function() {
            var self = this;
            this.workmodel = new Jma.Addgroup.Entities.selectWorkSystem_model();
            this.WorkSystem = new Jma.Components.Form.editors.selectWorkSystem({
                model: this.workmodel,
                key: 'checked',
                schema: {
                    editorAttrs: { readonly: "readonly" }
                }
            })
            self.layoutview.workSystem.show(this.WorkSystem);
            self.layoutview.on('save', function() {
                self.WorkSystem.commit();
                _.each(self.WorkSystem.collection.models, function(model) {
                    model.save();
                    console.log(model);
                })
            })
        },
        // OpenBar组件
        moreSettingRender: function() {
            var self = this;
            this.model = new Jma.Addgroup.Entities.messegeNotify();
            this.model.fetch({
                success: function() {
                    self.form = new Jma.Components.Form.editors.OpenBar({
                        model: self.model,
                        template:Jma.Addgroup.Templates.toggleTemplate,
                        key: 'messegenotify',
                        schema: {
                            editorAttrs: { title:'消息提醒',readonly: "readonly" },
                        }
                    })
                    self.layoutview.moreSetting.show(self.form);
                }
            })
            self.layoutview.on('save', function() {
                console.log(111111);
                self.form.commit();
                self.model.save();
            })
        }
    });
    Addgroup.StartApp = function(options) {
        Addgroup.Controllers = new Addgroup.Controller(options);
    };
    Addgroup.StopApp = function(options) {
        $('.add-container').remove();
        Addgroup.Controllers = null;
    };
})
