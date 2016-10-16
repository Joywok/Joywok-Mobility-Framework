/**
 * Created by zhailei on 16/9/20.
 */
var parent = 'card'
var id = 'Card-1';
var template = '<div class="list-block list-block-'+id+'">\
                    <div class="list-block-h">Card-top</div>\
                    <div class="list-block-w">\
                      <div class="card list-card">\
                        <div class="card-bg"></div>\
                        <div class="card-bg-color"></div>\
                        <div class="card-w">\
                          <div class="avatar avatar-1">\
                            <img src="http://www.joywok.com/public/images/avatar/hdr-pic.png"/>\
                          </div>\
                          <div class="info">\
                            <div class="info-1 ellipsis">关于微信－微服务页面设计及开发...</div>\
                            <div class="info-2">\
                              <span>李佳萍</span>\
                              <span>2016.01.25</span>\
                              <span>会办中</span>\
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

