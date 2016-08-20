
/*
* 数据文件
* createDate:2016-08-20 11:10:32
* author: XXXXXX
*/
Jma.module('Qiandao', function(Qiandao, Jma, Backbone, Marionette, $, _){

	
	var Entities = {};


	Entities.Collection = Backbone.Collection.extend({
		url:'/api/qiandao',
		parse:function(resp){
			return resp['datas'];
		}
	})


	Qiandao.Entities = Entities

})
