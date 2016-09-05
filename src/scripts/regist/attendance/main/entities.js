/*
 * 数据文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Attendance.Entities', function(Entities, Jma, Backbone, Marionette, $, _) {

    // Entities.model = Backbone.Model.extend({
    //     url: '/api/attendenceRecords',
    //     parse: function(resp) {
    //         return resp['timeCards'];
    //     }
    // });
    Entities.formModel = Backbone.Model.extend();


    Entities.itemModel = Backbone.Model.extend({
        urlRoot: '/api/attendenceRecords',
    });

    Entities.recordCollection = Backbone.Collection.extend({
        url: '/api/attendenceRecords',
        model:Entities.itemModel,
        parse: function(resp) {
            return resp['timeCards'];
        }
    });

    Entities.personModel = Backbone.Model.extend({
        url: '/api/personInfo',
        parse: function(resp) {
            return resp['datas'];
        }
    });

})
