/*
 * 视图文件
 * createDate:2016-09-07 12:00:15
 * author: XXXXXX
 */
Jma.module('Addgroup.Views', function(Views, Jma, Backbone, Marionette, $, _) {

    Views.LayoutView = Marionette.LayoutView.extend({
        className: 'add-content',
        template: Jma.Addgroup.Templates.LayoutTemplate,
        regions: {
            selectMember: '.select-member',
            workSystem: '.select-work-system',
            moreSetting: '.more-setting',
            goBack: '.goback'
        },
        onShow: function() {
            this.addRegions({ selectMember: this.$el.find('.select-member') })
            this.addRegions({ workSystem: this.$el.find('.select-work-system') })
            this.addRegions({ moreSetting: this.$el.find('.more-setting') })
            this.addRegions({ goBack: this.$el.find('.goback') })
        },
        // events: {
        //     'click .goback': 'goback'
        // },
        // goback: function() {
        //     console.log(12);
        //     Jma.module('Setting.Addgroup').stop();

        // }
    });

    Views.itemView = Marionette.ItemView.extend({
        template: Jma.Addgroup.Templates.BackTemplate,
        events: {
            'click .go-back': 'goback'
        },
        goback: function() {
            console.log(123);
            Jma.module('Setting.Addgroup').StopApp();

        }
    })


})
