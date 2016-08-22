/*
 * 数据文件
 * createDate:2016-08-20 11:10:48
 * author: XXXXXX
 */
Jma.module('Edit.Entities', function(Entities, Jma, Backbone, Marionette, $, _) {
    Entities.model = Backbone.Model.extend({
        url: '/api/qiandao',
        parse: function(resp) {
            return resp['datas'];
        }
    });
})
