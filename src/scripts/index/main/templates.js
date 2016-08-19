/*
 * 模板文件
 * createDate:2016-08-11 10:53:23
 * author: XXXXXX
 */
Ehr.module('Regist.Templates', function(Templates, Ehr, Backbone, Marionette, $, _) {
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
Ehr.module('Apps.Templates', function(Templates, Ehr, Backbone, Marionette, $, _){
  Templates.HeaderTemplate = _.template('<div class="bar bar-header" style="position:relative">\
               <div class="bar-w">\
                 <h1 style="display:inline-block;width:30%"><a href="#index/personal">Cancel</a></h1>\
                 <h1 style="display:inline-block;width:30%"><a href="#index/personinfo">个人信息</a></h1>\
                 <h1 style="display:inline-block;width:30%"><a href="#index/regist">post</a></h1>\
               </div>\
             </div>');

});


});
