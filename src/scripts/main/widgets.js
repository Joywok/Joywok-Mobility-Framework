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