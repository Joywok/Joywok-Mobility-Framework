/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'input'
var id = 'Drop-icon-input';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h"></div>\
                    <div class="list-block-w">\
                      <div class="list-item">\
                        <div class="list-item-w">\
                          <label>Drop-icon-input</label>\
                          <div class="list-item-region">\
                            <div class="input-w hasAfter"></div>\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                 </div>'
module.exports = {
  id:id,
  template:template,
  callBack:function(){
    var model = new Backbone.Model({
      Text:''
    });
    var form = new Jma.Components.Form.editors.Text({
      model:model,
      key:'Text',
      schema:{
        editorAttrs:{
          placeholder:"I'm here!"
        }
      }
    })
    var MyView = Marionette.LayoutView.extend({
      el:'.list-block-'+id,
      regions: {
        mainRegion:'.input-w'
      }
    });
    var view = new MyView();
    view.mainRegion.show(form);

    view.$el.find('.setvalue').click(function () {
      form.setValue(3);
    })

    view.$el.find('.get').click(function () {
      console.log(form.getValue())
    })

    view.$el.find('.getkey').click(function () {
      var data = form.getkeys()
      console.log(data)
    })

  }
}

