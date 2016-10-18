##Joywok-Mobility-Framework

###项目说明

  此项目是一个专注于用WEB开发技术，基于HTML5创建的移动端应用的一个开发框架。配合Javascript开发框架来简化你的应用，提供移动端基本应用组件，帮助你有效地管理用户界面，拥有真正的底层设备的权力，使软件开发变得更容易和更快。
JMF基于MV*结构， 支持模块化开发、按需动态加载、完善的双向绑定，有助于管理复杂的应用程序。
####Joywok Mobility Framework具有以下特点
* 简化开发：利用很多平台的天然能力加速开发过程
* 统一视图：让发布在门户中的企业应用和原生应用视图统一
* 功能丰富：不仅仅是设备能力，所有协作能力都可能被开发者应用
* 支持集成：不是所有都要依赖本平台，用户认证等都可沿用现有企业的体系


###技术需求

####Jma-Frame框架的开发依赖于以下开源项目

 * [Jquery](http://jquery.com/)
 * [Undercore](http://underscorejs.org/)
 * [Backbone](http://backbonejs.org/)
 * [Marionette](http://marionettejs.com/)
 * [FontAwesome](http://fontawesome.io/)
 * [Bootstrap](http://getbootstrap.com/)
 * 第三方模块（Backbone-Form、Bootstrap-dialog、Bootstrap-datepicker等）



###JMF 工具链
Gulp用于前端项目的构建，如监控程序文件变化如监控程序文件变化，检查js代码正确性，压缩js，源码转换到发布目录，启动web 服务测试等。 检查Javascript编译Sass（或Less之类的）文件合并Javascript压缩并重命名合并后的Javascript。

JMF是使用gulp作为构建工具的。在JMF 目录中gulpfile.js是gulp项目的配置文件，gulpfile.js定义了多个任务。详解如下：
* css预编译与合并


```
gulp.task('css'， function(){
    var sass = require('gulp-ruby-sass');
    var concat = require('gulp-concat');
    var fs = require('fs');
    fs.readdir('src/scss/apps'， function(err， files){
    if (err) {  
       console.log('read dir error');
    }else{
       files.forEach(function(item){
        var appsName = item.indexOf('.scss') != -1 ? item.replace  
    ('.scss'，'') ： '';
           if(appsName !== ''){
        sass(['src/scss/apps/'+item])
             .on('error'， console.error.bind(console))
             .pipe(concat(appsName+'.css'))
             .pipe(gulp.dest('build/css'))
             .pipe($.size({title: 'styles:sass:'+appsName+'.css'})) 
          }       
        })
      }
    })
 })
```
相关说明：
gulp.task(name[，deps]，fn) 定义任务 name:任务名称 deps:依赖任务名称 fn：回调函数   
fs.readdir('src/scss/apps'， function(err， files) 执行任务处理的文件夹
sass(['src/scss/apps/'+item]) 'src/scss/apps/':处理的文件路径      
gulp.dest('build/css')  文件生成路径  
* 合并与压缩j s

```
  gulp.task('js', function () {
      var rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat');
      var fs = require('fs');
      fs.readdir('src/scripts', function(err, files){
      if (err) {  
      console.log('read dir error');
        }else{
            files.forEach(function(item){
           if(item != '.DS_Store'){
             gulp.src('src/scripts/'+item+'/**/*.js')
               .pipe(concat(item+'.js')) 
         .pipe(gulp.dest('build/js')
               .pipe(rename({suffix： '.min'})) 
               .pipe(uglify())  
             .pipe(gulp.dest('build/js'));  
             console.log(item+'打包完成');
              }    
       })
    }
  })
 })
```

相关说明:
gulp.src(globs[， options]) globs:处理的文件路径(字符串或者字符串数组)     
concat(item+'.js') item:文件名 合并所有javascript文件    
gulp.dest(path[， options]) 处理完后文件生成路径    
rename({suffix: '.min'}) 压缩后的文件
* 监听程序文件变化

```
  gulp.watch(['src/scss/apps/*.scss']，['css']);
  gulp.watch(['routers/router/*.js']，['concatRoutes']);
```
当对文件进行更改时，监视任务被用来执行，watch()方法将监听变化并自动运行完成编译。
*  server
server task启动服务器，一般前端开发都是起一个服务器在浏览器里测试。

```
  gulp.task('serve',['css','concatRoutes'],function(){
    var routerFs = require('./routers/router')(router);
    browserSync({
        notify: false,
        server: {
          baseDir: ['src', 'test','.'],
          routes:{
           "/bower_components":"bower_components",
             "/test":"test"
          },
         middleware:router
        }
   });
```
### JMF 开发环境搭建
####clone代码
执行命令：
```
git clone https://github.com/Joywok/Jma-Framework.git
 ```
####安装依赖  
执行命令：

```
cd Jma-Framework
npm install
bower install
```
［注意： bower、npm 依赖于 Node.js，请确保你的机器安装 Nodejs 环境，安装方式参见https://nodejs.org/en/］
####各安装包版本号

   * font-awesome:v4.2.0

   * jquery:v2.1.4

   * Underscore:v1.8.3
   * backbone:v1.1.2

   * Marionette:v2.4.7

   *  moment:v2.8.4

   * bootstrap-switch:v3.3.2

   * bootstrap:v3.3.1

   * backbone-forms:v0.14.0

####启动调试环境
执行命令：

```
gulp
```
通过运行gulp，启动Browersync开发调试环境。




####项目运行

```
执行命令：$ gulp  
 ```

   


###文件引入
***

```
<!--  核心 CSS 文件 -->

<link rel="stylesheet" href="/build/public/index.css" />

<!--  核心 JavaScript 文件 -->

<script type="text/javascript" src="/build/public/framework.js">
</script>
//Joyowk内的网页开发工具包
<script type="text/javascript" src="/build/public/jssdk.js">
</script>
//主要框架启动程序
<script type="text/javascript" src="/src/scripts/main/index.js">
</script>
<script type="text/javascript" src="/src/scripts/main/dicts.js">
</script>
<script type="text/javascript" src="/src/scripts/main/funcs.js">
</script>
<script type="text/javascript" src="/src/scripts/main/
templates.js"></script>
<script type="text/javascript" src="/src/scripts/main/entities.js">
</script>
<script type="text/javascript" src="/src/scripts/main/views.js">
</script>
<script type="text/javascript" src="/src/scripts/main/fix.js">
</script>
<script type="text/javascript" src="/src/scripts/main/
comonents.js"></script>
<script type="text/javascript" src="/src/scripts/main/widgets.js">
</script>
<script type="text/javascript" src="/src/scripts/main/start.js">
</script>


```

###结构说明

```
├── bower_components      #项目开发中web包资源
├── build                             #项目生成后的代码
├── mobilecsscomponents #MobileCss组件
├── routers                         #用于本地开发模拟后台的路由文件
├── src                                #项目主要开发代码文件
    ├── scripts                 #主要开发代码
              ├── main         #基础框架代码文件(主程序入口文件)
├── node_modules             #npm的包管理
├── fonts                            #Font-awasome字体文件
├── scss                               #css编译前代码
├── styles                           #css编译后代码
└── index.html                  #主要入口文件

```

####主程序入口文件介绍

```
├── scripts                 #主要开发代码
        ├─ main               #基础框架代码文件(主程序入口文件)  
        ├── dicts.js           #字典文件    
        ├── entities.js       # 数据文件      
        ├── index.js          #主要入口文件    
        ├── router.js         # 路由文件 
        ├── templates.js  # 模板文件   
        ├── views.js          #视图文件 
        ├── start.js           #项目启动文件 
        ├── widgets.js      #视图文件 
        ├── comonents.js   #应用组件
```

主程序入口文件是使用该框架必不可少的，相关介绍如下：
*   index.js文件

``` 
var Jma = new Marionette.Application();
Jma.VERSION = '0.0.0'; 
Jma.addInitializer(function(){
      Jma.addRegions({
          headerRegion: '#header',
          mainRegion: '#main',
          footerRegion: '#footer',
        });
   });
   ```
相关说明：
Marionette.Application( )创建应用
var Jma = new Marionette.Application()项目命名空间
Jma.addRegion( )方法绑定视图区域，处理视图的渲染
Jma.addInitializer( )默认region加载
Jma.VERSION = '0.0.0'版本号

*   src/script/main/funs.js文件

全局方法集合，这里可以定义一些常用方法，可全局使用。

*   src/script/main/router.js
  全局路由
  
```
Jma.module('Router', function(Router, Jma, Backbone, Marionette, $, _){
    Router.Router = Jma.AppRouter.extend({
        appRoutes:{
    '':'index
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function(){
            Backbone.history.navigate(' Demo '); 
            Jma.App.StartApp();
        }
    });
   Router.on('start', function(){
        new Router.Router({
            controller: new Router.Controller
        });
    });
});
```
相关说明：
Backbone.history.navigate('  ')启动默认路由
Jma.App.StartApp()启动项目
*   src/script/main/start.js
启动应用

```
$(function(argument) {
  Jma.start();
});
 ```
*   src/script/main/templates.js
全局模版，有效地组织页面的结构和底层逻辑。
* src/script/main/views.js
全局视图，Backbone的视图对象可以展示Model数据，也可以把用户编辑的Model数据传递到后台，可以通过监听事件操作视图里的DOM元素。
* src/script/main/widgest.js 
部分通用组件（包含Loading 、Dialog），基本应用参考： http://open.joywok.com/javascript/index.html
* src/script/main/comonents.js
Backbone-form扩展组件，基本应用参考： http://open.joywok.com/javascript/index.html


###使用方法 

#### 新建项目
执行命令：

```
.   createModulejs.sh  x 
```
参数说明： x  项目名称 
. createModulejs.sh demo

```
├─script        
    ├─demo    
          ├─ main 
          ├── dicts.js         #字典文件    
          ├── entities.js     #数据文件      
          ├── index.js        #主要入口文件    
          ├── router.js      #路由文件 
          ├── templates.js  #模板文件   
          ├── views.js        #视图文件 
    ├─ main             
        ├── dicts.js           #字典文件    
        ├── entities.js       # 数据文件      
        ├── index.js          #主要入口文件    
        ├── router.js         # 路由文件 
        ├── templates.js  # 模板文件   
        ├── views.js          #视图文件 
        ├── start.js           #项目启动文件 
        ├── widgets.js      #视图文件 
        ├── comonents.js   #应用组件
```

*  templates.js模板文件

有效地组织页面的结构和底层逻辑。<%=  %>标签来组织和布局页面的结构。在views.js中调用template()函数绑定模板，templateHelpers（）可将数据内容渲染到模板标签中对应的对象属性中，从而实现根据模板绑定数据的页面效果。请结合以下views.js文件详细介绍，便于理解。

```
Templates.demoTemplate = _.template('\
    <div class="qiandao-info-item">\
      <div class="qiandao-info-item-c">\
        <label>时间</label>\
        <div class="qiandao-info-main">\
          <%=demo()%>\
        </div>\
      </div>\
    </div>')
```
*   entities.js  数据文件

    Model是Backbone中所有数据模型的基类，用于封装原始数据，并提供对数据进行操作的方法，我们一般通过继承的方式来扩展和使用它。
Backbone中的Model就像是映射出来的一个数据对象，它可以对应到数据库中的某一条记录，并通过操作对象，将数据自动同步到服务器数据库。
Backbone提供了与服务器数据的无缝连接，我们只需要操作本地Model对象，Backbone就会按照规则自动将数据同步到服务器。
Collection就是一个Model集合。因为Model是一条数据记录，也就是说，Collection相当于是一个数据集。

```
Jma.module('Demo.Entities', function(Entities, Jma, Backbone, Marionette, $, _){
    Entities.demoModel = Backbone.Model.extend({
      urlRoot : 'urlPath',
       parse: function(data){
        if(data.err){
           return '请求失败';
          }else{
           return data;
       }
     }
     });
   Entities.demoCollection = Backbone.Collection.extend({
      url : 'urlPath',
     model:Entities.demoModel,
     parse: function(data){
        if(data.err){
         return '请求失败';
       }else{
          return data;
       }
     }
   });
})
```
参数说明： url(数据请求地址)，parse(返回数据)
*   views.js 

Backbone的视图对象可以展示Model数据，也可以把用户编辑的Model数据传递到后台，可以通过监听事件操作视图里的DOM元素。创建视图时，可以通过传入model或collection属性和值，将某一模型或集合直接注册到视图中，Backbone视图创建元素时只需要使用tagName、id、className属性。此Backbone视图对象的el属性是一个指向该元素的引用。同时它也用来监听DOM上的事件然后做出响应。

```
Jma.module('Demo.Views', function(Views, Jma, Backbone, Marionette, $, _) {  
  Views.demoLayoutView = Marionette.LayoutView.extend({  
    className: 'main-content',   
    template: 'template',  
    regions: {   
       demoRegion: '#demo',   
    ｝   
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
   Views.demomItemView = Marionette.ItemView.extend({   
     template: 'template',    
      initialize: function() {},    
     getTemplate: function() {    
     return '返回逻辑模板';   
       },   
     templateHelpers: function() {    
       var self = this;   
       return {   
         demo: function() {   
           return 'value';    
          }   
        };    
      },    
     onRender: function() {},   
     modelEvents: {   
        'change': 'render',   
     },   
     triggers: {    
       'change': 'render',    
      }   
    });   
   Views.demomCollectionView = Marionette.CollectionView.extend({   
      template: 'template',   
     tagName: 'div',    
     className: 'classname',    
     childView: Views.demomItemView,    
     emptyView: Views.demoEmptyView,    
     triggers: {    
        'change': 'render',   
     ｝    
   ｝）   
｝）    
```
相关说明：

* Marionette.LayoutView
用来画布局的view，还会创建区域管理器来管理其内部的regions。   
参数说明：
region：管理应用中的可见区域，包括内容的显示和移除。
Triggers：事件触发
Events：事件绑定
* Marionette.ItemView
用来显示一条数据项的view
参数说明：
tempalte：指定view 层页面结构
templateHelpers：返回tempalte数据对象（结合template.js理解）
onRender：在视图渲染时触发(根据需求进行处理)
modelEvents：ItemViews可以直接绑定到model事件(在model发生改变时触发，如上述代码中发生‘change’时触发‘render’，视图会在无手动刷新的情况下重新渲染。
Triggers：事件触发
* CollectionView
将遍历所有的模型指定的集合,使用指定childView渲显示每个模型对应的 ItemView 实例，
参数说明：
tagName/className:是一个指向该元素的引用
childView:指定子视图
tempalteHelpers：返回数据(结合上述templates.js理解)
*   router.js 
路由文件，如果想通过改变路由展示页面指定内容，可操作路由文件 。
 
   ```
Jma.module('Demo.Router', function(Router, Jma, Backbone, Marionette, $, _){    
    Router.startWithParent = true;    
    Router.Router = Jma.AppRouter.extend({    
      appRoutes:{   
          'demo':'demo',    
        }   
      });   
    Router.Controller = Marionette.Controller.extend({    
      demo: function(){   
         Jma.module('Demo').StartApp();   
       }    
    });   
    Router.on('start', function(){    
      new Router.Router({   
       controller: new Router.Controller    
      });   
    });   
});   
```
函数说明：
AppRoute( ):路由设置
appRoutes: 通常用于当用户设置应用直接加载一个特定的端点。
appRoutes:映射传参方式如下：
 ’ ’:’demo’默认对应的链接为

`<a href="#demo">Load View</a>`

'demo':'demo'对应的链接为

`<a href="#demo">Load View</a>`

"/posts/:id":"getPost", 对应的链接为


`<a href="#/posts/id(这里id表示实际id)">Load View</a>`

"/route/:action":"loadView",对应的链接为


`<a href="#/route/action">Load Route Action View</a> `

‘demo’:’demo’后者对应Router.Controller中args2函数启动一个module 
*   index.js    主文件
Backbonem Module允许创建模块化封装逻辑。他们可以用来将大型应用程序分成多个文件，并构建应用程序的单个应用。
 
```
Jma.module('Demo', function(Demo, Jma, Backbone, Marionette, $, _){
   Demo.Controller = Marionette.Controller.extend({
    initialize: function(options){
      this.options = options;
      this.collectionview=newJma.Demo.Views.demoLayoutView ()
      Jma.mainRegion.show(this.demoLayoutView);
     },
  });
  Demo.StartApp =  function(options){
    Demo.Controllers = new Demo.Controller(options);
    };
   Demo.StopApp = function(options){
    console.log('stop');
    };
})
```
相关说明：
initialize：初始化
StartApp：启动module
StopApp：撤销module
这里对以下两行代码进行一下说明：通过show方法将视图显示到页面当中。Jma.mainRegion请结合6.2.1中index.js理解。
```
  this.collectionview=newJma.Demo.Views.demoLayoutView()
  Jma.mainRegion.show(this.demoLayoutView);
```
####新建子应用
执行命令：
```
.   createModulejs.sh  x  xx 
```
参数说明： x  (项目名称) xx (模块名称) 
.createModulejs.sh  demo  project  结构如下 
```
├──demo    
    ├─ main     
    ├─ project    
           ├─ main   
```


####CSS组件使用方法
css组件使用方法访问  [http://open.joywok.com/mobilecss/index.html](http://open.joywok.com/mobilecss/index.html)


####JS组件
js组件使用方法访问  [http://open.joywok.com/javascript/index.html](http://open.joywok.com/javascript/index.html)
* 自定义form组件方法
在该项目中，你还可以按照你所需的UI样式或者项目功能自定义form组件。它们必须从Backbone.Form.editors.Base继承。

```
var CustomEditor = Backbone.Form.editors.Base.extend({
  tagName: 'input',
  events: {
      'change': function() {
        // The 'change' event should be triggered whenever something     
        // happens that affects the result of `this.getValue()`. 
        this.trigger('change', this);
      },
    'focus': function() {
      // The 'focus' event should be triggered whenever an input
      // within this editor becomes the `document.activeElement`.
      this.trigger('focus', this);
      // This call automatically sets `this.hasFocus` to `true`.
    },
    'blur': function() {
       // The 'blur' event should be triggered whenever an input            
      //within this editor stops being the `document.activeElement`.
      this.trigger('blur', this);
      // This call automatically sets `this.hasFocus` to `false`.
      }
    },
  initialize: function(options) {
    // Call parent constructor
    Backbone.Form.editors.Base.prototype.initialize.call(this, options);
    // 自定义代码
    if (this.schema.customParam) this.doSomething();
  },
  render: function() {
    this.setValue(this.value);
    return this;
  },
  getValue: function() {
    return this.$el.val();
  },
  setValue: function(value) {
    this.$el.val(value);
  },
  focus: function() {
    if (this.hasFocus) return;
    this.$el.focus();
  },
  blur: function() {
    if (!this.hasFocus) return;
    this.$el.blur();
  }
});
```
   如想要了解更多关于backbone-forms的知识可以访问  [https://github.com/powmedia/backbone-forms](https://github.com/powmedia/backbone-forms) 
   
###Licence

***

####Must Abide By

* 在项目开发中必须遵守许可协议与版权声明    

####Giving your power:

* Freely download and use Jma-Framework, in whole or in part, for personal， private， company interna, or commercial purposes
Use Bootstrap in packages or distributions that you create

* Modify the source compiled

* Grant a sublicense to modify and distribute Jma-Framework to third parties not included in the license


###开源协议
***
Jma-Frame 建立在众多优秀的开源框架和优秀的组件基础之上，遵循和使用 MIT License 开源协议，无论个人还是公司，都可以免费自由使用。

