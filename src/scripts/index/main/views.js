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
