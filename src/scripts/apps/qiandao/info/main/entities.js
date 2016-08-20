
/*
* 数据文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info', function(Info, Jma, Backbone, Marionette, $, _){

	var Entities = {};

	Info.Entities = Entities

	Entities.model = Backbone.Model.extend({
		url:function(){
			return '/api/qiandao/'+this.get("id")
		},
		parse:function(data){
			return data['data']
		}
	})

})
