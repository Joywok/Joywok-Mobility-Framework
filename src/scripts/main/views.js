/******************************************************************
 *
 * 全局视图
 * creator： yjl
 * date: 2016-03-31
 *
 *******************************************************************/
Ehr.module('Views',function(Views, Ehr, Backbone, Marionette, $, _){
	
    Views.Layout = Marionette.LayoutView.extend({
        template: 'demo',
        render: function() {
            var that = this;
            this.resolveUIRegions();
            Marionette.LayoutView.prototype.render.apply(this, arguments);
            this.$('[data-region]').each(function(i, item) {
            var region = $(item).attr('data-region');
            var region2 = $.camelCase(region);
            region2 && that.addRegion(region2 + 'Region', {el:$(item)} );
            });
            return this;
        },
        resolveUIRegions:function(){
            if(!this.ui)return;
                for(var i in this.ui){
                this.addRegion(i+'Region',this.ui[i])
            }
        },
        resolveTemplateRegions:function(){
            var that = this,
            regionAttr = this.regionAttr,
            region_selector = '['+regionAttr+']';
            this.$el.find(region_selector).each(function(i, item) {
                var region = $(item).attr(regionAttr);
                region&&that.addRegion($.camelCase(region)+'Region', '['+regionAttr+'='+region+']');
            });
            this.triggerMethod('resoveregion');
        },
        serializeData: function() {
            var data = Marionette.LayoutView.prototype.serializeData.apply(this, arguments);
            return _.size(data)&&data||this.options;
        }
    });

    Views.ItemView = Marionette.ItemView.extend({
        constructor: function(options) {
          this.options = _.defaults(options, _.result(this.defaults));
          Marionette.ItemView.prototype.constructor.apply(this, arguments);
        },
        template: _.template('')
    });

    Views.CompositeView = Marionette.CompositeView.extend({
        emptyView: Views.EmptyView,
        childViewContainer: "",
        template: _.template(''),
        getChildView: function(item) {
          return Views[item.get('viewType')] || Marionette.getOption(this, "childView") || this.constructor;
        }
    });

    Views.Item = Views.ItemView.extend({
        tagName: 'li',
        template: _.template('<a href="#<%- value %>"><%= name %></a>'),
        ui: {
          links: 'a',
          buttons: '.btn',
          editClass: '.js-edit',
          deleteClass: '.js-delete'
        },
        events: {
          'click @ui.links': 'onClick',
          'click @ui.buttons': 'onPress'
        },
        triggers: {
          'click @ui.editClass': 'edit',
          'click @ui.deleteClass': 'delete'
        },
        onClick: function() {
          this.trigger('clicked', this.model);
        },
        onPress: function() {
          this.trigger('pressed', this.model);
        }
      });
      
      Views.List = Views.CompositeView.extend({
        tagName: 'ul',
        template: _.template(''),
        childView: Views.Item
      });


      Views.EmptyView = Marionette.ItemView.extend({
        template: Ehr.Templates.emptyTemplate,
      });

})

