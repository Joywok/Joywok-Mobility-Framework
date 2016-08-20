
/*
* 视图文件
* createDate:2016-08-20 10:25:51
* author: XXXXXX
*/
Jma.module('Apps',function(Apps, Jma, Backbone, Marionette, $, _){

    var Views = {}

    Views.LayoutView = Marionette.LayoutView.extend({
        template:Apps.Templates.LayoutViewTemplate
    })

    Apps.Views = Views;

})
