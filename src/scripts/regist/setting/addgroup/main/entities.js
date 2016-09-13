/*
 * 数据文件
 * createDate:2016-09-07 12:00:15
 * author: XXXXXX
 */
Jma.module('Addgroup.Entities', function(Entities, Jma, Backbone, Marionette, $, _) {

    Entities.messegeNotify = Backbone.Model.extend({
        url: '/api/messegeNotify',
        parse: function(resp) {
            return resp;
        }
    });
    Entities.selectUser_commectionModel = Backbone.Model.extend({
        urlRoot: 'api/member'
    });
    Entities.selectWorkSystem_model = Backbone.Model.extend({
        urlRoot: 'api/workSystem'
    })


})
