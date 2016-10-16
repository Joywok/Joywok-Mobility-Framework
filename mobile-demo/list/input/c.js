/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'input'
var id = 'Icon-input';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h"></div>\
                    <div class="list-block-w">\
                      <div class="list-item">\
                        <div class="list-item-w">\
                          <label>Icon-input</label>\
                          <div class="list-item-region">\
                            <div class="input-w has-icon">\
                              <div class="input-icon">\
                              <i class="fa fa-search"></i>\
                              </div>\
                              <input type="text" placeholder="搜索"/>\
                            </div>\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
  callBack:function(){

  }
}

