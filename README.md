###Joywok手机端开发框架


####项目说明
此项目为Joywok手机端项目开发框架，定期更新手机端模块


####结构说明
```
├── build                  #项目生成后的代码
├── mobilecsscomponents    #MobileCss组件
├── routers                #用于本地开发模拟后台的路由文件，其下面File为数据文件

主要开发文件[src]

├── fonts                  #Font-awasome字体文件
├── scripts                #主要开发代码
    ├── apps			 	   #子模块代码文件
    ├── main			 	   #基础框架代码文件
├── scss                   #css编译前代码
├── styles                 #css编译后代码
└── index.html             #主要入口文件


```


####技术说明
  +使用Jquery+Undercore+Backbone+Marionette 做为底层js架构,加入第三方模块（Backbone-Form表单引擎，Bootstrap-dialog、Bootstrap-datepicker等）进行扩展
  +使用Bootstrap 做为底层Css架构



####安装说明
```
 npm install
	
 bower inistall
	
 gulp
	
```