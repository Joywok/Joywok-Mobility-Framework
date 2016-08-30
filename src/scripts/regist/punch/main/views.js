/*
 * 视图文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Punch.Views', function(Views, Jma, Backbone, Marionette, $, _) {

    Views.punchLayoutView = Marionette.LayoutView.extend({
        className: 'punch',
        template: Jma.Punch.Templates.LayoutTemplate,
        regions: {
            personInfo: '#personInfo',
            punchRecord: '#punchRecord'
        },
        onShow: function() {
            this.addRegions({ punchRecord: this.$el.find('#punchRecord') });
            this.addRegions({ personInfo: this.$el.find('#personInfo') })
        },
        triggers: {
            'click .demo': 'demo',
        },
        events: {
            'click .demo': 'demo'
        },
        demo: function() {
            console.log('demo for events function')
        }
    });

    Views.personItemView = Marionette.ItemView.extend({
        template: Jma.Punch.Templates.personInfoTemplate,
        templateHelpers: function() {
            return {
                initname: function() {
                    return this.name
                },
                desc: function() {
                    return this.describe
                },
                avatar: function() {
                    return this.url
                },
                date: function() {
                    var presentDate = (new Date()).getTime();
                    return moment(presentDate).format('YYYY-MM-DD')
                }
            };
        },
        onRender: function() {}
    });
    Views.recordItemView = Marionette.ItemView.extend({
        template: Jma.Punch.Templates.recordItemTemplate,
        templateHelpers: function() {
            return {

              Location:function(){
                    return this.location
                },
                initTime: function() {
                    return moment(this.date * 1000).format('YYYY-MM-DD')
                },
                Content:function(){
                    // console.log(typeof(this.type));
                    if(this.type=="1"){
                       return "<span>上</span>\
                               <span>上班打卡时间</span>"
                                                      
                    }else{
                        return "<span>下</span>\
                                <span>下班打卡时间</span>"
                    }
                }
            }
        },
        onRender: function() {},
        modelEvents: {
            'change': 'render',
        },
        triggers: {
            'change': 'render',
        }
    })
    Views.recordCollectionView = Marionette.CompositeView.extend({
        template: Jma.Punch.Templates.recordTemplate,
        tagName: 'div',
        className: 'record-list',
        childView: Jma.Punch.Views.recordItemView,
        childViewContainer:'.record',
        // emptyView: Views.demoEmptyView,
        triggers: {
            'change': 'render',
        }
    });

})
