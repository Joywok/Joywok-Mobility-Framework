/*
 * 视图文件
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
// Ehr.module('Regist.Views', function(Views, Ehr, Backbone, Marionette, $, _) {

//     Views.registView = Marionette.ItemView.extend({
//         className: 'regist-container',
//         template: Ehr.Regist.Templates.ReigistTemplate,
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
//          var route=new Ehr.Router.Router({
//             controller: new Ehr.Router.Controller
//         });
//          route.navigate('index/post');
//             Ehr.module('Post').StartApp();

//         }
//     })



// })

/*
* 视图文件
* createDate:2016-08-16 15:50:31
* author: XXXXXX
*/
Ehr.module('Apps.Views',function(Views, Ehr, Backbone, Marionette, $, _){

    Views.HeaderItem= Marionette.ItemView.extend({
        className: 'navbar',
        template: Ehr.Apps.Templates.HeaderTemplate ,
         initialize: function() {
        },
        templateHelpers: function() {
            var self = this;
            return {};
        },
    });


})
