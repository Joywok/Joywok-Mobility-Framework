(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['marionette', 'backbone', 'underscore'], function(Marionette, Backbone, _) {
      return (root.Jma = factory(root, Marionette, Backbone, _));
    });
  } else if (typeof exports !== 'undefined') {
    var Marionette = require('marionette');
    var Backbone = require('backbone');
    var _ = require('underscore');
    module.exports = factory(root, Marionette, Backbone, _);
  } else {
    root.Jma = factory(root, root.Marionette, root.Backbone, root._);
  }

}(this, function(root, Marionette, Backbone, _) {

    "use strict";
    //命名空间
    var Jma = new Marionette.Application();
    //版本号
    Jma.VERSION = '0.0.0';
    //默认region加载
    Jma.addInitializer(function(){
        Jma.addRegions({
            navRegion: '#nav',
            headerRegion: '#header',
            mainRegion: '#main',
            footerRegion: '#footer',
        });
    });
    //路由扩展
    Jma.AppRouter = Marionette.AppRouter.extend({
        onRoute:function(name,path,args){
            var router = {name:name,path:path,args:args};
            Jma.commands.execute('change:Router',router);
        }
    });
    Jma.on('start', function(options) {
        if (Backbone.history){
            Backbone.history.start();
        }
    });
    return Jma;
}));