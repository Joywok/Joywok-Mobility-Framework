
/*
* 视图文件
* createDate:2016-08-20 11:10:51
* author: XXXXXX
*/
Jma.module('Qiandao.Info',function(Info, Jma, Backbone, Marionette, $, _){
    var Views = {};
    Info.Views = Views
    Views.LayoutView = Marionette.LayoutView.extend({
    	className:'qiandao-info',
    	template:Info.Templates.LayoutViewTemplate,
    	regions:{
				container:'.qiandao-info-w'
			},
    	onShow:function(){
    		this.addRegions({container:this.$el.find('.qiandao-info-w')})
    	}
    })


    Views.InfoView = Marionette.LayoutView.extend({
        className:'qiandao-info',
        template:Info.Templates.InfoViewTemplate,
        templateHelpers:function(){
            return {
                initContent:function(){
                    console.log(this,'123');
                    return this.content
                },
                initDate:function(){
                    return (moment(this.date*1000).format('YYYY-MM-DD'))
                }
            }
        }
    })

})
