/*
 * 视图文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Edit.Views', function(Views, Jma, Backbone, Marionette, $, _) {

    Views.EditLayoutView = Marionette.LayoutView.extend({
        className: 'edit-content',
        template: Jma.Edit.Templates.EditTemplate,
        regions: {
            dateRegion: '#dateSelect',
        },
        events: {
            'click .editSave': 'save'
        }
    });



})
