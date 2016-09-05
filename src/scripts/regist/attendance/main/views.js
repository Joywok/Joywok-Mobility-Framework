/*
 * 视图文件
 * createDate:2016-08-29 10:53:30
 * author: XXXXXX
 */
Jma.module('Attendance.Views', function(Views, Jma, Backbone, Marionette, $, _) {

    Views.AttendanceLayoutView = Marionette.LayoutView.extend({
        className: 'Attendance',
        template: Jma.Attendance.Templates.LayoutTemplate,
        regions: {
            personInfo: '#personInfo',
            AttendanceRecord: '#AttendanceRecord',
            AttendanceAction: '#AttendanceAction',
            date: '#date'
        },
        onShow: function() {
            this.addRegions({ AttendanceRecord: this.$el.find('#AttendanceRecord') });
            this.addRegions({ personInfo: this.$el.find('#personInfo') })
        },
    });

    Views.personItemView = Marionette.ItemView.extend({
        template: Jma.Attendance.Templates.personInfoTemplate,
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

    // 一条打卡信息记录
    Views.recordItemView = Marionette.ItemView.extend({
            template: Jma.Attendance.Templates.recordItemTemplate,
            templateHelpers: function() {
                var self = this;
                // console.log(this.options.model.collection.length)
                return {
                    Localtion: function() {
                        if (self._index == self.options.model.collection.length - 1) {
                            return '<span class="localtion">' + this.location + '</span>'
                            + '<div class="update">更新打卡&nbsp;<i class="fa fa-repeat" aria-hidden="true"></i></div>'
                        } else {
                            return '<span class="localtion">' + this.location + '</span>'
                        }
                    },
                    initTime: function() {
                        return Jma.Attendance.Funcs.getTime(this.time);
                    },
                    Work: function() {
                        if (this.type == "1") {
                            return "上"
                        } else {
                            return "下"
                        }
                    },
                    Text: function() {
                        if (this.type == "1") {
                            return "上班打卡时间:"
                        } else {
                            return "下班打卡时间:"
                        }
                    }
                }
            },
            onRender: function() {},
            modelEvents: {
                'change': 'render'
            },
            events: {
                'click .update': 'update'
            },
            update: function() {
                var self = this;
                console.log(this.model.get('time'));
                var str = this.model.get('type') == "1" ? "上班" : "下班";
                new Jma.Dialog.confirm({
                    content: ' \
                <div class="confirm">\
                 <div>确定要更新此次打卡记录吗</div>\
                </div>',
                    hasClose: true,
                    buttons: [{
                        label: '确定',
                        cssClass: 'btn-accppt',
                        action: function() {
                            console.log(parseInt((new Date()).getTime()));
                            console.log(self.model);
                            
                            self.model.save('time', parseInt((new Date()).getTime()));
                        }

                    }, {
                        label: '确定',
                        cssClass: 'btn-reject',
                        action: function() {
                            console.log('xxxx');
                        }
                    }]
                })

            },
            triggers: {
                'change': 'render',
            }
        })
        // 打卡记录
    Views.recordCollectionView = Marionette.CompositeView.extend({
        template: Jma.Attendance.Templates.recordTemplate,
        tagName: 'div',
        className: 'record-list',
        childView: Jma.Attendance.Views.recordItemView,
        childViewContainer: '.record',
        triggers: {
            'change': 'render'
        }

    });

    // 打卡按钮信息更新
    Views.AttendanceActionView = Marionette.ItemView.extend({
        template: Jma.Attendance.Templates.AttendanceActionTemplate,
        templateHelpers: function() {
            return {
                getText: function() {
                    if (this.type == "1") {
                        return {
                            text1: '上',
                            text2: '上班打卡'
                        }
                    } else {
                        return {
                            text1: '下',
                            text2: '下班打卡'
                        }
                    }
                },
                getTime: function() {
                    return Jma.Attendance.Funcs.getTime(this.time);
                }
            };
        },
        onRender: function() {},
        modelEvents: {
            'change': 'render'

        },
        events: {
            'click .Attendance-outer': 'confirm'
        },
        confirm: function() {
            this.model.save();
            // Jma.Funcs.getTime()
            var str = this.model.get('type') == "1" ? "上班" : "下班";
            new Jma.Dialog.confirm({
                content: ' \
                <div class="confirm">\
                 <div class="success-tip">\
                  <i class="fa fa-map-marker" aria-hidden="true"></i>\
                  <span>打卡成功</span>\
                 </div>\
                 <div class="success-time">\
                  <span>' + str + '</span>\
                  <span>' + Jma.Attendance.Funcs.getTime(this.model.get('time')) + '</span>\
                 </div>\
                 <p>快乐工作，不是要求，是承诺</p>\
                </div>',
                hasClose: true,
                buttons: [{
                    label: '我知道了',
                    cssClass: 'btn-accppt',
                    action: function() {
                        console.log('xxxx');
                    }

                }, {
                    label: '确定',
                    cssClass: 'btn-reject',
                    action: function() {
                        console.log('xxxx');
                    }
                }]
            })


        }
    })

})
