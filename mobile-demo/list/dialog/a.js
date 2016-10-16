/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'dialog'
var id = 'dialog';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h"></div>\
                    <div class="list-block-w">\
                      <div class="list-item">\
                        <div class="list-item-w">\
                          <label>Alert</label>\
                          <div class="list-item-region">\
                          	<button type="button" class="btn btn2 alert">Alert</button>\
                          </div>\
                        </div>\
                      </div>\
                      <div class="list-item">\
                        <div class="list-item-w">\
                          <label>Confirm</label>\
                          <div class="list-item-region">\
                            <button type="button" class="btn btn2 confirm-btn">Confirm</button>\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
  callBack:function(){
  	$('.alert').click(function(){
      new Jma.Dialog.confirm({
         content:'<div class="custom-confirm-c">\
                 <img src="http://www.joywok.com/public/images/avatar/hdr-pic.png"/>\
                 <h1>申请说明</h1>\
                 <p>请提供工号、姓名、用途、具体要求如<br/>税前税后，年收入还是月收入等相<br/>关信息；于工作日内给徐璠发<br/>邮件(跨区除外)预约取件</p>\
             </div>',
         hasClose: true,
         buttons: [{
              label: '确定',
              cssClass: 'btn-accppt',
              action: function() {
                    alert('你点击了' + this.label + '按钮');
                }
            }]
         })
    })
   
    $('.confirm-btn').click(function(){
      new Jma.Dialog.confirm({
         content:'xxxxx',
         hasClose:true,
         buttons:[
            {
              label: '确定',
             cssClass: 'btn-accppt',
              action: function () {
                alert('你点击了确定');
             }
            },
           {
              label: '取消',
             cssClass: 'btn-reject',
              action: function () {
                alert('你点击了取消');
             }
            }
          ]
        })
    })


  }
}

