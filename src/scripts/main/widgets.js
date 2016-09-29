$.notifyDefaults({
    type: 'warning',
    placement: {align: 'center'},
    mouse_over: 'pause',
    z_index: 9999,
  //  animate: {
  //    enter: 'animated bounceInDown',
  //    exit: 'animated bounceOutUp'
  //  },
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">' +
      '<span aria-hidden="true" class="fa fa-remove"></span><span class="sr-only">Close</span>' +
      '</button>' +
      '<span data-notify="icon"></span> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>'
  });
Jma.Notify = $.notify;

// Jma.Dialog = BootstrapDialog;
//
// Jma.Dialog.confirm = function(message, callback) {
//   $(document).addClass('overflow');
//     return new BootstrapDialog({
//         title: '确认',
//         message: message,
//         cssClass:'confirm-dialog',
//         closable: true,
//         data: {
//             'callback': callback
//         },
//         buttons: [{
//                 label: '取消',
//                 action: function(dialog) {
//                     typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
//                     $(document).removeClass('overflow');
//                     dialog.close();
//                 }
//             }, {
//                 label: '确定',
//                 cssClass: 'btn-success',
//                 action: function(dialog) {
//                     typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
//                     $(document).removeClass('overflow');
//                     dialog.close();
//                 }
//             }]
//     }).open();
// };
//
//
// Jma.Dialog.alert = function(message, callback) {
//   return new BootstrapDialog({
//       title: '警告',
//       message: message,
//       cssClass:'confirm-dialog',
//       closable: true,
//       data: {
//           'callback': callback
//       },
//       buttons: [{
//               label: '确定',
//               cssClass: 'btn-success',
//               action: function(dialog) {
//                   typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
//                   dialog.close();
//               }
//           }]
//   }).open();
// };
//
// Jma.Dialog.configDefaultOptions({
// 	title: '提示：',
// 	closeByBackdrop: false,
// });
//
// Jma.Controller = Marionette.Controller.extend({
// 	Layout:Marionette.LayoutView,
// 	getLayout:function(){
// 		this.layout = this.layout||new this.Layout();
// 		return this.layout;
// 	}
// });

Jma.Dialog = {};
Jma.Dialog.alert = function(options){
  $('.custom-alert').remove();
  var clientH = document.documentElement.clientHeight || document.body.clientHeight;
  var el = $('<div class="custom-alert '+(options["buttons"].length>1?'custom-confirm':'')+'">\
						<div class="custom-alert-bg"></div>\
						<div class="custom-alert-w visiHide">\
							'+(options["hasClose"]?'<div class="custom-alert-close">\
								<i class="fa fa-close"></i>\
							</div>':'')+'\
							<div class="custom-alert-c">\
								'+options["content"]+'\
							</div>\
							<div class="custom-alert-btn">\
							  '+(_.map(options["buttons"],function(item){
                    return '<button type="button" class="btn btn1 '+item["cssClass"]+'">'+item["label"]+'</button>'
                  }).join(""))+'\
							</div>\
						</div>\
					</div>');

  var container = el.find('.custom-alert-w');
  var btn = el.find('.custom-alert-btn');
  $('body').append(el);
  setTimeout(function(){
    console.log(container.height(),clientH,btn.height());
    if(container.height() > clientH - btn.height()){
      container.find('.custom-alert-c').css({maxHeight:clientH-30-30+'px',overflowY:'auto'})
      container.css({top:0,bottom:0}).removeClass('visiHide');
    }else{
      container.css({marginTop:'-'+(container.height()/2)+'px'}).removeClass('visiHide')
    }
  },0)
  el.delegate('.custom-alert-close','click',function(){
    el.remove();
  })
  _.each(options["buttons"],function(i){
    el.delegate('.'+i["cssClass"],'click',function(){
      if(i['action']){
        el.remove();
        i['action']()
      }
    })
  })
}
Jma.Dialog.confirm = Jma.Dialog.alert


Jma.Loading = {};

//type:1,2,3,4,5

Jma.Loading.template = {
  1:'<div class="loading-1"></div>',
  2:'<div class="loading-2">\
      <div class="loading-2-bounce1"></div>\
      <div class="loading-2-bounce2"></div>\
     </div>',
  3:'<div class="loading-3">\
      <div class="rect1"></div>\
      <div class="rect2"></div>\
      <div class="rect3"></div>\
      <div class="rect4"></div>\
      <div class="rect5"></div>\
     </div>',
  4:'<div class="loading-4">\
      <div class="bounce1"></div>\
      <div class="bounce2"></div>\
      <div class="bounce3"></div>\
     </div>',
  5:'<div class="loading-5">\
      <div class="sk-circle1 sk-circle"></div>\
      <div class="sk-circle2 sk-circle"></div>\
      <div class="sk-circle3 sk-circle"></div>\
      <div class="sk-circle4 sk-circle"></div>\
      <div class="sk-circle5 sk-circle"></div>\
      <div class="sk-circle6 sk-circle"></div>\
      <div class="sk-circle7 sk-circle"></div>\
      <div class="sk-circle8 sk-circle"></div>\
      <div class="sk-circle9 sk-circle"></div>\
      <div class="sk-circle10 sk-circle"></div>\
      <div class="sk-circle11 sk-circle"></div>\
      <div class="sk-circle12 sk-circle"></div>\
     </div>'
}

Jma.Loading.main = Backbone.View.extend({
  initialize:function(options){
    _.extend(this,options)
    this.$el = $('<div class="loading-specail">\
                    <div class="loading-specail-w"></div>\
                   </div>')
    this._init_render();
    this._init_value();

    if(this.specailClassName){
      this.$el.addClass(this.specailClassName);
    }


    if(this.region){
      this.region.append(this.$el)
    }
  },
  _init_render:function(){
    this.$el.find('.loading-specail-w').append(Jma.Loading.template[this.type])
  },
  _init_value:function(){
    if(this.value){
      this.$el.append('<div class="loading-specail-value">'+this.value+'</div>');
    }
  },
  close:function(){
    this.$el.remove();
  }
})


