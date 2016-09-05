
/*
* 数据文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Regist.Statistics', function(Statistics, Jma, Backbone, Marionette, $, _){

	var Entities = {};

	Entities.Model = Backbone.Model.extend({})
	Entities.Collection = Backbone.Collection.extend({
		url:'/api/zhailei',
		parse:function(data){
			return data['data'];
		}
	});


	Statistics.Entities = Entities;
})
