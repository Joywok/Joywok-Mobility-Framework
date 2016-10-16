
/*
* 数据文件
* createDate:2016-10-13 14:47:10
* author: XXXXXX
*/
Jma.module('Demo.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.demoModel = Backbone.Model.extend({
		urlRoot : 'urlPath',
		parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

	Entities.demoCollection = Backbone.Collection.extend({
		url : 'urlPath',
		model:Entities.demoModel,parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

})
