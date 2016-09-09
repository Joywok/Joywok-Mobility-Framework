###Joywok手机端开发框架


####项目说明
此项目为Joywok手机端项目开发框架，定期更新手机端模块,用于实现快速开发,如项目中使用jQuery作为底层库,可直接使用,提供基础的样式选择


####结构说明

```
├── bower_components       #项目开发中web包资源
├── build                  #项目生成后的代码
├── mobilecsscomponents    #MobileCss组件
├── routers                #用于本地开发模拟后台的路由文件，其下面File为数据文件
├── src                    #项目主要开发代码件
├── node_modules           #npm的包管理



主要开发文件[src]

├── fonts                  #Font-awasome字体文件
├── scripts                #主要开发代码
    ├── apps                   #子模块代码文件
    ├── main                   #基础框架代码文件
├── scss                   #css编译前代码
├── styles                 #css编译后代码
└── index.html             #主要入口文件

```

####技术说明
  +使用Jquery+Undercore+Backbone+Marionette 做为底层js架构,加入第三方模块（Backbone-Form表单引擎，Bootstrap-dialog、Bootstrap-datepicker等）进行扩展
  +使用Bootstrap 做为底层Css架构


####安装说明

 通过npm进行下载、安装以及管理已经安装的包、bower是web包管理工具
```
 npm install
    
 bower inistall
    
 gulp
    
```

####项目主要功能

1. 提供移动端基本应用组件

2. 实现页面快速开发 
```

####使用方法		

1. 当创建一个新项目时,  通过执行. createModulejs.sh x 生成项目  
例如:创建项目app,通过执行. createModulejs.sh app 即可, 每一个创建项目都会生成一个main文件夹,该文件夹包含以下文件
    ├──app                         
        ├── main             
             ├── dicts.js       #字典文件    
             ├── entities.js    #数据文件      
             ├── index.js       #主要入口文件    
             ├── router.js      #路由文件 用来控制同一页面不同内容的跳转    
             ├── templates.js  ＃模板文件   
             ├── views.js       #视图文件    
		


2. 根据项目模块,执行 . createModulejs.sh x (模块）xx 生成项目模块xx

	例如: . createModulejs.sh  app  project   同样每一个模块当中也会有一个main文件

    ├──app                
        ├── main          
        ├── project
              ├── dicts.js       #字典文件
              ├── entities.js    #数据文件  
              ├── index.js       #主文件
              ├── router.js      #路由文件 用来控制同一页面不同内容的跳转
              ├── templates.js  ＃模板文件
              ├── views.js       #视图文件  


* templates.js文件,就是页面中需要展示的布局,在tempaltes文件中声明不同的模板,将在view层中展示

* entities.js  数据文件,请求后台数据，根据需要在该文件中设置请求数据的地址,view层中数据的渲染均来源该文件。

     `Entities.Collection = Backbone.Collection.extend({
        	url:'/api/zhailei',
          parse:function(data){
          return data['data'];
           }
        })`

	   url:数据请求地址,parrse:返回数据

* views.js  是用来显示entities.js中model或者collection的数据到页面的,同时它也可用来监听DOM上的事件然后做出响应。

	通过template指定视图的模板还可以通过regions绑定view到不同的html区域,通过index.js文件show 方渲染  

    	`View.LayoutView = Marionette.LayoutView.extend({
            template:Statistics.Templates.LayoutView,
            regions:{
               title:'.regist-list-title',
                container:'.regist-list-c'
            },
            templateHelpers:function(){
                return {
                    initUser:function(){
                        return this.user
                   }
               }
            },
             onShow:function(){
                this.addRegion('date',this.$el.find('.regist-list-changeDate'))
                this.addRegion('container',this.$el.find('.regist-list-c'))
            }
    })`

     如果view当中需要渲染数据,通过函数tempalteHelpers来返回数据（此数据为model中数据,在index.js中,会通过相关声明指定view的model 

    或collection）,例如上述,只需在数据需要显示区,调用<=%initUser()=>即可
 

* router.js    路由文件 ,如果想通过改变路由展示页面指定内容,可操作路由文件		

	    `Router.Router = Jma.AppRouter.extend({
	          	appRoutes:{
		       	'':'forward',
		        	'app/Attendance':'Attendance',
			
	        	}
	      })

	      Router.Controller = Marionette.Controller.extend({
	      		forward: function(){
	       		Jma.module('app').StartApp();//启动项目或者是子项目			
	       	},
	       	Attendance: function(){
	       		Jma.module('Regist.Attendance').StartApp();//同上
	       	}
	      })

* index.js    主文件

	   实例化collection,model,view,渲染页面

3. 若模块中含有子模块,执行. createModulejs.sh x （模块）xx (子模块）xxx  生成项目模块的子模块xxx	

    	├──app   
         ├── main              
         ├── project
               ├── main    
               ├── subproject    
                        ├── main			

4. 通过mobilecsscomponents中关联组件,实现view层样式

	关于mobilecsscomponents组件使用,访问（......）,将所需组件放置到你想要显示的地方即可

5. backbone-form组件使用
 
 先实例化组件,通过show方法渲染

*日期组件

	`var form = new Jma.Components.Form.editors.FormSelect({
			      model:model,
			      key:'date',
			      schema:{
			        editorAttrs:{readonly:"readonly"},
			      }
			    })`

*select组件

     `var form = new Jma.Components.Form.editors.FormSelect({
          model:model,
          key:'select',
         schema:{
            editorAttrs:{readonly:"readonly"},
            list:[
               {key:1,val:'2016-01'},
                {key:2,val:'2016-02'},
               {key:3,val:'2016-03'},
               {key:4,val:'2016-04'},
               {key:5,val:'2016-05'},
               {key:6,val:'2016-06'},
               {key:7,val:'2016-07'},
               {key:8,val:'2016-08'},
               {key:9,val:'2016-09'},
               {key:10,val:'2016-10'},
               {key:11,val:'2016-11'},
               {key:12,val:'2016-12'}
              ]
         }
       })`


*弹出框

     $('.xxxxx')触发事件,实例化Jma.Dialog.confirm

    `$('.xxxxx').click(function(){
         new Jma.Dialog.confirm({
            content:'xxxxx',
             hasClose:true,
            buttons:[
             {
                label: '确定',
               cssClass: 'btn-accppt',
                action: function () {
                  console.log('xxxx');
               }
              },
              {
                label: '确定',
               cssClass: 'btn-reject',
               action: function () {
                 console.log('xxxx');
               }
             }
           ]
          })
       })`













 

        


  