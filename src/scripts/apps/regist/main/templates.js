
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
