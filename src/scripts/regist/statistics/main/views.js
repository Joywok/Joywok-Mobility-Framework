
/*
* 视图文件
* createDate:2016-08-29 10:54:07
* author: XXXXXX
*/
Jma.module('Regist.Statistics',function(Statistics, Jma, Backbone, Marionette, $, _){
    var View = {};
    View.loadingView = Marionette.ItemView.extend({
        className:'loading',
        template:'<div class="loading-c">加载中…</div>'
    })
    View.emptyView = Marionette.ItemView.extend({
        className:'empty',
        template:'<div class="empty-view">暂无数据</div>'
    })
    View.LayoutView = Marionette.LayoutView.extend({
        template:Statistics.Templates.LayoutView,
        regions:{
            title:'.regist-list-title',
            container:'.regist-list-c'
        },
        templateHelpers:function(){
            return {
                initUser:function(){
                    return '<div class="regist-list-user">\
                                <div class="regist-list-user-pic">\
                                    <img src="data:image/jpeg;base64,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"/>\
                                </div>\
                                <div class="regist-list-user-info">\
                                    <div class="regist-list-user-name">翟磊</div>\
                                </div>\
                            </div>'
                }
            }
        },
        onShow:function(){
            this.addRegion('date',this.$el.find('.regist-list-changeDate'))
            this.addRegion('container',this.$el.find('.regist-list-c'))
        }
    })

    View.itemView = Marionette.ItemView.extend({
        events:{
            'click .regist-list-item-header':'showDate'
        },
        className:'regist-list-item',
        template:Statistics.Templates.ItemView,
        templateHelpers:function(){
            var self = this;
            return {
                initActive:function(){
                    // console.log(self.model.)
                    if(this.id == self.model.collection.at(0).get('id')){
                        return 'show'
                    }
                },
                initDate:function(){
                    return (moment(this.date*1000).format('YYYY-MM-DD'));
                },
                initList:function(){
                    if(this.timeCards.length!=0){
                        var html = _.map(this.timeCards,function(i){
                            return '<div class="list-item">\
                                     <div class="list-item-w">\
                                        <div class="regist-type">'+(i["type"]=="1"?'上班时间':'下班时间')+(moment(i["date"]*1000).format('HH:mm'))+'</div>\
                                        <div class="regist-lbs">'+(i["lbs"])+'</div>\
                                     </div>\
                                    </div>'
                        }).join('')
                        return html;
                    }else{
                        return ''
                    }
                }
            }
        },
        showDate:function(evt){
            $('.regist-list-item-w').removeClass('show');
            $(evt.currentTarget).parent().addClass('show')
        }
    })
    View.listView = Marionette.CompositeView.extend({
        className:'regist-list-main',
        template:Statistics.Templates.listView,
        childView:View.itemView,
        childViewContainer:'.list-w',
        emptyView:View.emptyView
    })

    Statistics.View = View
})
