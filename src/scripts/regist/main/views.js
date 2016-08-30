/*
 * 视图文件
 * createDate:2016-08-29 10:53:20
 * author: XXXXXX
 */
Jma.module('Regist.Views', function(Views, Jma, Backbone, Marionette, $, _) {

    Views.navView = Marionette.ItemView.extend({
        className: 'nav',
        template: Jma.Regist.Templates.navTemplate
    });
})
