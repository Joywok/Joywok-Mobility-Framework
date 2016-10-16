/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'tabs'
var id = 'tabs-3';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h">Tabs-3</div>\
                    <div class="list-block-w">\
                      <div class="tabs tabs-progress tabs-color-light">\
                         <div class="tabs-w">\
                          <a class="tabs-item">\
                           <div class="tabs-item-w">\
                            <input type="radio"  checked name="light_group" id="light_tab1">\
                            <label for="light_tab1">1</label>\
                           </div>\
                          </a>\
                          <a class="tabs-item">\
                           <div class="tabs-item-w">\
                            <input type="radio" name="light_group" id="light_tab2">\
                            <label for="light_tab2">2</label>\
                           </div>\
                          </a>\
                          <a class="tabs-item">\
                           <div class="tabs-item-w">\
                            <input type="radio" name="light_group" id="light_tab3">\
                            <label for="light_tab3">3</label>\
                           </div>\
                          </a>\
                          <a class="tabs-item">\
                           <div class="tabs-item-w">\
                            <input type="radio" name="light_group" id="light_tab4">\
                            <label for="light_tab4">4</label>\
                           </div>\
                          </a>\
                         </div>\
                        </div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
}

