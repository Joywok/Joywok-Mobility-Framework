
/*
* 主文件
* createDate:2016-10-13 14:47:15
* author: XXXXXX
*/
Jma.module('Demo.Info', function(Info, Jma, Backbone, Marionette, $, _){
	Info.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			Jma.mainRegion.$el.html('');

			var type = options['type'];
			if(type.indexOf('ui-')!=-1){
				type = 'ui/'+type.split('-')[1]
			}

      SystemJS.import('list/'+type+'/index.js?time='+Math.random()).then(function(){
      	console.log('xxxx');
      });
		}
	});

	Info.StartApp =  function(options){
		Info.Controllers = new Info.Controller(options);
	};

	Info.StopApp = function(options){
		console.log('stop');
	};

})
