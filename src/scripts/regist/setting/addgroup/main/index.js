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
                self.layoutview.goBack.show(new Jma.Addgroup.Views.itemView());
                self.selectMemberRender();
                self.selectWorkSystemRender();
                self.moreSettingRender();
            })
        },
        selectMemberRender: function() {
            var self=this;
            this.form = new Jma.Components.Form.editors.selectUser({
                key: 'user',
                schema: {
                    editorAttrs: { readonly: "readonly" }
                }
            })
            this.layoutview.selectMember.show(this.form);
            this.layoutview.on('save',function(){
                self.form.commit();
            })
        },
        selectWorkSystemRender: function() {
            var model = new Backbone.Model();
            var self=this;
            this.form = new Jma.Components.Form.editors.selectWorkSystem({
                model: model,
                key: 'user',
                schema: {
                    editorAttrs: { readonly: "readonly" }
                }
            })
            this.layoutview.workSystem.show(this.form);
            this.layoutview.on('save',function(){
                self.form.commit();
            })
        },
        moreSettingRender: function() {
            var model = new Backbone.Model();
            this.form = new Jma.Components.Form.editors.OpenBar({
                model: model,
                key: 'aaa',
                schema: {
                    editorAttrs: { title: '消息提醒', readonly: "readonly" },
                }
            })
            this.layoutview.moreSetting.show(this.form)
        }
    });
    Addgroup.StartApp = function(options) {
        Addgroup.Controllers = new Addgroup.Controller(options);
    };
    Addgroup.StopApp = function(options) {
        console.log(this.app.Views)       
        Addgroup.Controllers = null;
    };

})
