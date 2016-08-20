
/*
* 字典文件
* createDate:2016-08-10 19:05:29
* author: XXXXXX
*/
Jma.module('Regist.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});


/*
* 数据文件
* createDate:2016-08-11 10:53:23
* author: XXXXXX
*/
// Jma.module('Regist.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

// 	Entities.Model = Backbone.Model.extend({
		
// 	});

// })
Jma.module('Apps.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

Entities.Model = Backbone.Model.extend({
		
	});
})


/*
 * 主文件
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
Jma.module('Regist', function(Regist, Jma, Backbone, Marionette, $, _) {

    Regist.Controller = Marionette.Controller.extend({
        initialize: function(options) {
            this.options = options;
            console.log('Regist');
            this.registmodel = new Jma.Regist.Entities.Model();
            this.view = new Jma.Regist.Views.registView({
                model: this.registmodel
            });
            this.show();
        },
        show: function() {
            var self = this;
            Jma.mainRegion.show(self.view);
        }
    });
    Regist.StartApp = function(options) {
        Regist.Controllers = new Regist.Controller(options);
    };
    Regist.StopApp = function(options) {
        console.log('stop');
    };

})


/*
* 路由文件
* createDate:2016-08-10 19:05:29
* author: XXXXXX
*/
// Jma.module('Regist.Router', function(Router, Jma, Backbone, Marionette, $, _){

// 	Router.startWithParent = true;

// 	Router.Router = Jma.AppRouter.extend({
// 		appRoutes:{
// 			"index":'index',		
// 		}
// 	});

// 	Router.Controller = Marionette.Controller.extend({
// 		 index: function(){
//             Backbone.history.navigate('#index')
//             Jma.Regist.StartApp();
//         }
// 	});

// 	Router.on('start', function(){
// 		new Router.Router({
// 			controller: new Router.Controller
// 		});
// 	});

// });


/*
 *   路由
 */
Jma.module('Apps.Router', function(Router, Jma, Backbone, Marionette, $, _) {
    Router.startWithParent = true;
    Router.Router = Jma.AppRouter.extend({
        appRoutes: {
            '': 'index',
            'index/personal': 'index',
            'index/personinfo': 'personinfo',
            'index/regist': 'regist'
        }
    });
    Router.Controller = Marionette.Controller.extend({
        index: function() {
            var self = this;
            Backbone.history.navigate('#index/personal');
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        personinfo: function() {
            Jma.module('PersonInfo').StartApp();
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });
        },
        regist: function() {
                        Jma.module('registCenter').StartApp();
            Jma.module('Apps').StartApp({ module: 'PersonInfo' });

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
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
Jma.module('Regist.Templates', function(Templates, Jma, Backbone, Marionette, $, _) {
    // Templates.testTemplate = _.template('html代码');
   //  Templates.ReigistTemplate = _.template('\
			// <div class="regist">\
			//  <div class="bar bar-header" style="position:relative">\
   //             <div class="bar-w">\
   //               <button type="button" class="btn" style="color:#157efb">Cancel</button>\
   //               <button type="button" class="btn right" style="color:#bobobo" id="post">Post</button>\
   //               <h1 class="ellipsis">签到</h1>\
   //             </div>\
   //           </div>\
			// </div>\
   //          <div class="registerSel">\
   //           <div class="select">\
   //             <form class="form-horizontal " role="form">\
   //               <div class="form-group">\
   //                  <div class="content">\
   //                   <select id="basic" class="selectpicker popup-select show-tick form-control">\
   //                     <option selected>您的回报线</option>\
   //                     <option>上班</option>\
   //                     <option>下班</option>\
   //                  </select>\
   //                 </div>\
   //               </div>\
   //             </form>\
   //            </div>\
   //          </div>\
   //          <div class="MessageBook">\
   //            <textarea placeholder="告诉同事们你来这里做什么"></textarea>\
   //          </div>\
   //           <div class="personInfo">\
   //             <div class="list">\
   //              <div class="list-h"></div>\
   //                <div class="list-w">\
   //                  <div class="list-block">\
   //                   <div class="list-block-h"></div>\
   //                   <div class="list-block-w">\
   //                      <div class="list-item list-item-icon">\
   //                        <i class="icon icon-address active"></i>\
   //                        <div  class="list-item-w">\
   //                          <div class="list-item-val ellipsis">客户:&nbsp;&nbsp;<input type="text" placeholder="请输入" style="text-align:left"></div>\
   //                        </div>\
   //                      </div>\
   //                   </div>\
   //                  </div>\
   //                </div>\
   //             </div>\
   //          </div>\
   //          <div id="date">\
   //           <div class="list">\
   //              <div class="list-h"></div>\
   //                <div class="list-w">\
   //                  <div class="list-block">\
   //                   <div class="list-block-h"></div>\
   //                   <div class="list-block-w">\
   //                     <div class="list-item list-item-icon">\
   //                        <i class="icon icon-address active"></i>\
   //                        <div  class="list-item-w">\
   //                          <div class="list-item-val ellipsis"><span id="weekday" style="display:inline-block;width:12%"></span><span style="display:inline-block;text-align:center;width:90%" type="date" id="riqi"></span></div>\
   //                        </div>\
   //                      </div>\
   //                   </div>\
   //                  </div>\
   //                </div>\
   //             </div>\
   //              <div class="list">\
   //              <div class="list-h"></div>\
   //                <div class="list-w">\
   //                  <div class="list-block">\
   //                   <div class="list-block-h"></div>\
   //                   <div class="list-block-w">\
   //                      <div class="list-item list-item-icon">\
   //                        <i class="icon icon-address active"></i>\
   //                        <div  class="list-item-w">\
   //                          <div class="list-item-val ellipsis" ><span style="display:inline-block;width:12%">当前时间</span><input type="text" id="time"  style="width:90%;text-align:center"></div>\
   //                        </div>\
   //                      </div>\
   //                   </div>\
   //                  </div>\
   //                </div>\
   //             </div>\
   //          </div>\
			// ');




/*
* 模板文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Templates', function(Templates, Jma, Backbone, Marionette, $, _){
  Templates.HeaderTemplate = _.template('<div class="bar bar-header" style="position:relative">\
               <div class="bar-w">\
                 <h1 style="display:inline-block;width:30%"><a href="#index/personal">Cancel</a></h1>\
                 <h1 style="display:inline-block;width:30%"><a href="#index/personinfo">个人信息</a></h1>\
                 <h1 style="display:inline-block;width:30%"><a href="#index/regist">post</a></h1>\
               </div>\
             </div>');

});


});

/*
 * 视图文件
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
// Jma.module('Regist.Views', function(Views, Jma, Backbone, Marionette, $, _) {

//     Views.registView = Marionette.ItemView.extend({
//         className: 'regist-container',
//         template: Jma.Regist.Templates.ReigistTemplate,
//         initialize: function() {

//         },
//         templateHelpers: function() {
//             var self = this;
//             return {};
//         },
//         events: {
//             "click button#post": 'post'
//         },
//         post: function() {
//          var route=new Jma.Router.Router({
//             controller: new Jma.Router.Controller
//         });
//          route.navigate('index/post');
//             Jma.module('Post').StartApp();

//         }
//     })



// })

/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Jma.module('Apps.Views',function(Views, Jma, Backbone, Marionette, $, _){

    Views.HeaderItem= Marionette.ItemView.extend({
        className: 'navbar',
        template: Jma.Apps.Templates.HeaderTemplate ,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
