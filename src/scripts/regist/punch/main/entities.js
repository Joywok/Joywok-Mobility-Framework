
/*
* 数据文件
* createDate:2016-08-29 10:53:30
* author: XXXXXX
*/
Jma.module('Punch.Entities', function(Entities, Jma, Backbone, Marionette, $, _){


	Entities.recordCollection = Backbone.Collection.extend({
		url:'/api/punch',
		parse:function(resp){
			console.log(resp['timeCards'])
			return resp['timeCards'];
		}
	});
	Entities.personModel =Backbone.Model.extend({
		url:'/api/personInfo',
		parse:function(resp){		
			return resp['datas'];
		}
	});

})
