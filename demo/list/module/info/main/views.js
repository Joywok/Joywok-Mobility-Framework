
/*
* 视图文件
* createDate:2016-10-09 21:14:14
* author: XXXXXX
*/
Jma.module('Info.Views',function(Views, Jma, Backbone, Marionette, $, _){
    Views.layoutView = Marionette.LayoutView.extend({
        className:'info-view',
        template:Jma.Info.Templates.layout,
        onShow:function(){
            this.addRegions({
                dataRegion:this.$el.find('.info-data-w'),
                cardRegion:this.$el.find('.info-card')
            })
        }
    })
	Views.CardView = Marionette.ItemView.extend({
        className:'card top-card-2',
        template:Jma.Info.Templates.cardView
    })

    Views.InfoView = Marionette.ItemView.extend({
        className:"info-data",
        template:Jma.Info.Templates.infoView,
        templateHelpers:function(){
            return {
                initContent:function(){
                    console.log('xxx')
                    return this.content;
                }
            }
        }
    })

})
