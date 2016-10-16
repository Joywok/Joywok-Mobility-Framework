/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'action-sheet'
var id = 'action-sheet-1';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h">Action-Sheet-1</div>\
                    <div class="list-block-w specail">\
                      <div class="action">\
                       <div class="action-h">\
                        <span>选择图片</span>\
                       </div>\
                       <div class="action-w">\
                        <div class="action-block">\
                         <div class="action-block-w">\
                          <div class="action-item">\
                           <div class="action-item-w">\
                            <i class="fa fa-camera color-energized"></i>\
                            <div class="action-item-c">拍照</div>\
                           </div>\
                          </div>\
                          <div class="action-item">\
                           <div class="action-item-w">\
                            <i class="fa fa-picture-o color-assertive"></i>\
                            <div class="action-item-c">从相册中选择</div>\
                           </div>\
                          </div>\
                         </div>\
                        </div>\
                       </div>\
                      </div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
}

