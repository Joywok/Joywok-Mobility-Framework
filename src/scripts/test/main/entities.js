
/*
* 数据文件
* createDate:2016-08-10 15:17:52
* author: XXXXXX
*/
Jma.module('Test.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

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
