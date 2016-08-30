
/*
* 模板文件
* createDate:2016-08-29 10:53:20
* author: XXXXXX
*/
Jma.module('Regist.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.navTemplate = _.template('<div class="regist-nav">\
            <div class="nav-tabs">\
                <a class="tabs-punch item active" href="#regist/punch">\
                    <div class="punch-icon">\
                        <i class="fa fa-map-marker" aria-hidden="true"></i>\
                    </div>\
                    <div class="punch-val">打卡</div>\
                </a>\
                <a class="tabs-statistics item" href="#regist/statistics">\
                    <div class="statistics-icon">\
                        <i class="fa fa-cog" aria-hidden="true"></i>\
                    </div>\
                    <div class="statistics-val">统计</div>\
                </a>\
                <a class="tabs-setting item" href="#regist/setting">\
                    <div class="setting-icon">\
                        <i class="fa fa-cog" aria-hidden="true"></i>\
                    </div>\
                    <div class="setting-val">设置</div>\
                </a>\
            </div>\
        </div>');

});
