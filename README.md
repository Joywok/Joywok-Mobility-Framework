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

1.当创建一个新项目时,  通过执行. createModulejs.sh x 生成项目
2.根据项目模块,执行 . createModulejs.sh x  (模块）xx  生成项目模块xx
3.若模块中含有子模块,执行. createModulejs.sh x （模块）xx (子模块）xxx  生成项目模块的子模块xxx
4.通过mobilecsscomponents中关联组件,实现view层样式



 

        


  