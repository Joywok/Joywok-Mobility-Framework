
/*
* 字典文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

Entities.Model = Backbone.Model.extend({
		
	});
})

/*
 * 主文件
 * createDate:2016-08-16 15:50:31
 * author: XXXXXX
 */
// Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _) {

//     Apps.Controller = Marionette.Controller.extend({
//         initialize: function(options) {
//             this.options = options;
//             console.log('Apps');
//             this.headermodel = new Jma.Apps.Entities.Model();
//             this.view = new Jma.Apps.Views.HeaderItem({
//                 model: this.headermodel
//             });
//             this.show();
//         },
//         show: function() {
//             var self = this;
//             Jma.headerRegion.show(self.view);
//         }
//     });
//     Apps.StartApp = function(options) {
//         Apps.Controllers = new Apps.Controller(options);
//     };
//     Apps.StopApp = function(options) {
//         console.log('stop');
//     };

// })



Jma.module('Apps', function(Apps, Jma, Backbone, Marionette, $, _) {
    Apps.Controller = Marionette.Controller.extend({

        initialize: function(options) {
            this.options = options;
            this.changeApp();
        },
         events:{
            'click .wrap':'tranform'
         },
         tranform:function(){
            $(".wrap").addClass("bar-active").siblings().removeClass('bar-active')
         },
        changeApp: function(options) {
            if (options) this.options = options;
            this.HeaderItem = new Jma.Apps.Views.HeaderItem();
            Jma.headerRegion.show(this.HeaderItem);
        }

    });
    Apps.StartApp = function(options) {
        Apps.Controllers = new Apps.Controller(options);
    };
    Apps.StopApp = function(options) {
        console.log('stop');
    };
})

/*
 *   路由
 */
Jma.module('Apps.Router', function(Router, Jma, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Jma.AppRouter.extend({
        appRoutes: {
            '': 'index',
            'index/cancel': 'cancel',
            'index/post': 'post',
            'index/regist': 'regist'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function() {
            var self = this;
            Backbone.history.navigate('#index/regist');
            Jma.module('Apps').StartApp();
             Jma.module('registCenter').StartApp();
        },
        post: function() {
            Jma.module('Post').StartApp();
            Jma.module('Apps').StartApp();
        },
        regist: function() {
            Jma.module('registCenter').StartApp();
            Jma.module('Apps').StartApp();

        },
        cancel:function(){
              Jma.module('Cancel').StartApp();
            Jma.module('Apps').StartApp();

        }

    });
    Router.on('start', function() {
        new Router.Router({
            controller: new Router.Controller
        });
    });

});


/*
* 模板文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Templates', function(Templates, Jma, Backbone, Marionette, $, _){
	Templates.HeaderTemplate = _.template('\
		<div class="bar bar-header" style="position:relative">\
               <div class="">\
                 <h1  class=" " style="display:inline-block;width:33%"><a href="#index/cancel">cancel</a></h1>\
                 <h1 class="bar-active" style="display:inline-block;width:32%"><a href="#index/regist">签到</a></h1>\
                 <h1 class="" style="display:inline-block;width:32.5%"><a href="#index/post">post</a></h1>\
               </div>\
             </div>');





});


/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Views',function(Views, Jma, Backbone, Marionette, $, _){

	Views.HeaderItem= Marionette.ItemView.extend({
		className: 'navbar',
		template: Jma.Apps.Templates.HeaderTemplate ,
         initialize: function(){
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})


/*
* 字典文件
* createDate:2016-08-16 15:51:29
* author: XXXXXX
*/
Jma.module('Cancel.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Cancel.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.Model = Backbone.Model.extend({
		
	});

})

/*
 * 主文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Cancel', function(Cancel, Jma, Backbone, Marionette, $, _) {

    Cancel.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('PersonalInfo.Cancel');
            this.model = new Jma.Cancel.Entities.Model();
            this.view = new Jma.Cancel.Views.CancelView({
                model: this.model
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    Cancel.StartApp = function(options) {
        Cancel.Controllers = new Cancel.Controller(options);
    };
    Cancel.StopApp = function(options) {
        console.log('stop');
    };

})


/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Apps.Cancel.Router', function(Router, Jma, Backbone, Marionette, $, _){

	// Router.startWithParent = false;

	Router.Router = Jma.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		Cancel: function(){
			Jma.module('Apps.Cancel').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});

/*
 * 模板文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Cancel.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {
    Templates.CancelTemplate = _.template('<div class="list">\
                                          <div class="list-h"></div>\
                                          <div class="list-w">\
                                             <div class="list-item">\
                                                <div class="list-item-w">\
                                                  <label>机构代码:</label>\
                                                  <div class="list-item-val ellipsis">0102</div>\
                                                </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构名称:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构地址:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>职位信息:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>其他介绍:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>客户姓名:</label>\
                                                  <div class="list-item-val ellipsis">刘金玉</div>\
                                               </div>\
                                             </div>\
                                           </div>\
                                       </div>');
});


/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Cancel.Views',function(Views, Jma, Backbone, Marionette, $, _){

    Views.CancelView= Marionette.ItemView.extend({
        className: 'Cancel',
        template: Jma.Cancel.Templates.CancelTemplate,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})


/*
* 字典文件
* createDate:2016-08-16 15:51:29
* author: XXXXXX
*/
Jma.module('Personal.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-16 15:51:29
* author: XXXXXX
*/
Jma.module('Post.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.Model = Backbone.Model.extend({
		
	});

})

/*
 * 主文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Post', function(Post, Jma, Backbone, Marionette, $, _) {

    Post.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('PersonalInfo.Post');
            this.model = new Jma.Post.Entities.Model();
            this.view = new Jma.Post.Views.PostView({
                model: this.model
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    Post.StartApp = function(options) {
        Post.Controllers = new Post.Controller(options);
    };
    Post.StopApp = function(options) {
        console.log('stop');
    };

})


/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Apps.Post.Router', function(Router, Jma, Backbone, Marionette, $, _){

	// Router.startWithParent = false;

	Router.Router = Jma.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		Post: function(){
			Jma.module('Apps.Post').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});

/*
 * 模板文件
 * createDate:2016-08-16 15:51:29
 * author: XXXXXX
 */
Jma.module('Post.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {
    Templates.PostTemplate = _.template('<div class="list">\
                                          <div class="list-h"></div>\
                                          <div class="list-w">\
                                             <div class="list-item">\
                                                <div class="list-item-w">\
                                                  <label>机构代码:</label>\
                                                  <div class="list-item-val ellipsis">0102</div>\
                                                </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构名称:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>机构地址:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>职位信息:</label>\
                                                  <div class="list-item-val ellipsis">＊＊＊＊＊＊</div>\
                                               </div>\
                                             </div>\
                                              <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>其他介绍:</label>\
                                                  <div class="list-item-val ellipsis">南京长江路</div>\
                                               </div>\
                                             </div>\
                                             <div class="list-item">\
                                               <div class="list-item-w">\
                                                  <label>客户姓名:</label>\
                                                  <div class="list-item-val ellipsis">刘金玉</div>\
                                               </div>\
                                             </div>\
                                           </div>\
                                       </div>');
});


/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Post.Views',function(Views, Jma, Backbone, Marionette, $, _){

    Views.PostView= Marionette.ItemView.extend({
        className: 'Post',
        template: Jma.Post.Templates.PostTemplate,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})


/*
* 字典文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Regist.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('registCenter.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.Model = Backbone.Model.extend({
		
	});

})

/*
 * 主文件
 * createDate:2016-08-16 15:50:55
 * author: XXXXXX
 */
Jma.module('registCenter', function(registCenter, Jma, Backbone, Marionette, $, _) {

    registCenter.Controller = Marionette.Controller.extend({
        initialize: function(options) {
        	this.options=options;
            this.registmodel = new Jma.registCenter.Entities.Model();
            this.view = new Jma.registCenter.Views.registView({
                model: this.registmodel
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    registCenter.StartApp = function(options) {
    	console.log(123);
        registCenter.Controllers = new registCenter.Controller(options);
    };
    registCenter.StopApp = function(options) {
        console.log('stop');
    };
})


/*
* 路由文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('Apps.registCenter.Router', function(Router, Jma, Backbone, Marionette, $, _){

	// Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
	});

	Router.Controller = Marionette.Controller.extend({
		registCenter: function(){
			Jma.module('Apps.registCenter').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});

 // Jma.module('registCenter.Schema',function(Schema, Spms, Backbone, Marionette, $, _){
 //     Schema.Filter = {
 //         year: { title: '年份', type: 'BootstrapSelect', options: [], template: Jma.registCenter.Templates.Form_Field_template_Fixed, style: 'default' },
 //         status: { title: '状态', type: 'BootstrapSelect', options: [{ val: 'active', label: '活动项目' }, { val: '2', label: '已立项' }, { val: '3', label: '已启动' }, { val: '4', label: '已开题' }, { val: 'inactive', label: '非活动项目' }, { val: '5', label: '已取消' }, { val: '6', label: '已结项' }, { val: '7', label: '已终止' }], template: Spms.Projects.Form.Templates.Form_Field_template_Fixed, style: 'default' }
 //     };
 // })


/*
* 模板文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('registCenter.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

Templates.registTemplate = _.template(' <div class="registerSel" style="margin-top: -20px;">\
             <div class="select">\
               <form class="form-horizontal" role="form">\
                 <div class="form-group">\
                    <div class="content">\
                     <select id="basic" class="selectpicker popup-select show-tick form-control">\
                       <option selected>您的回报线</option>\
                       <option>上班</option>\
                       <option>下班</option>\
                    </select>\
                   </div>\
                 </div>\
               </form>\
              </div>\
            </div>\
            <div class="MessageBook">\
              <textarea placeholder="告诉同事们你来这里做什么"></textarea>\
            </div>\
             <div class="personInfo">\
               <div class="list">\
                <div class="list-h"></div>\
                  <div class="list-w">\
                    <div class="list-block">\
                     <div class="list-block-h"></div>\
                     <div class="list-block-w">\
                        <div class="list-item list-item-icon">\
                          <i class="icon icon-address active"></i>\
                          <div  class="list-item-w">\
                            <div class="list-item-val ellipsis">客户:&nbsp;&nbsp;<input type="text" placeholder="请输入" style="text-align:left"></div>\
                          </div>\
                        </div>\
                     </div>\
                    </div>\
                  </div>\
               </div>\
            </div>\
            <div id="date">\
             <div class="list">\
                <div class="list-h"></div>\
                  <div class="list-w">\
                    <div class="list-block">\
                     <div class="list-block-h"></div>\
                     <div class="list-block-w">\
                       <div class="list-item list-item-icon">\
                          <i class="icon icon-address active"></i>\
                          <div  class="list-item-w">\
                            <div class="list-item-val ellipsis"><span id="weekday" style="display:inline-block;width:12%"></span><span style="display:inline-block;text-align:center;width:90%" type="date" id="riqi"></span></div>\
                          </div>\
                        </div>\
                     </div>\
                    </div>\
                  </div>\
               </div>\
                <div class="list">\
                <div class="list-h"></div>\
                  <div class="list-w">\
                    <div class="list-block">\
                     <div class="list-block-h"></div>\
                     <div class="list-block-w">\
                        <div class="list-item list-item-icon">\
                          <i class="icon icon-address active"></i>\
                          <div  class="list-item-w">\
                            <div class="list-item-val ellipsis" ><span style="display:inline-block;width:12%">当前时间</span><input type="text" id="time"  style="width:90%;text-align:center"></div>\
                          </div>\
                        </div>\
                     </div>\
                    </div>\
                  </div>\
               </div>\
            </div>');


  //  Templates.Form_Field_template_Fixed = _.template('\
  //    <form action="submit.html">\
  //   <h1>Register</h1>\
  //   <h2>About you</h2>\
  //   <div data-fields="title,name,birthday"></div>\
  //   <h2>Login details</h2>\
  //   <div data-fields="email,password,confirmPassword"></div>\
  //   <input type="submit" class="btn btn-primary submit" />\
  // </form>\
    // ');

});


/*
* 视图文件
* createDate:2016-08-16 15:50:55
* author: XXXXXX
*/
Jma.module('registCenter.Views',function(Views, Jma, Backbone, Marionette, $, _){

	 Views.registView = Marionette.ItemView.extend({
        className: 'regist-container',
        template: Jma.registCenter.Templates.registTemplate ,
        initialize: function() {

        },
        templateHelpers: function() {
            var self = this;
            return {};
        }
    })

})
