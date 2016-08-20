#创建模块和应用
function createModule(){
	if [ ! -d "$1" ]; then
		mkdir $1
		echo "\n$1已生成！\n"
		mkdir $1/main
		echo "$1/main已生成！\n"
		#生成index文件
		index="
/*
* 主文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$2', function($3, Jma, Backbone, Marionette, $, _){

	$3.Controller = Marionette.Controller.extend({
		initialize: function(options){
			this.options = options;
			console.log('$2');
		},
	});

	$3.StartApp =  function(options){
		$3.Controllers = new $3.Controller(options);
	};

	$3.StopApp = function(options){
		console.log('stop');
	};

})";
		echo -e "$index" >> "$1/main/index.js"
		echo "$1/main/index.js已生成！\n"
		#生成router文件
		router="
/*
* 路由文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$3.Router', function(Router, Jma, Backbone, Marionette, $, _){

	Router.startWithParent = true;

	Router.Router = Jma.AppRouter.extend({
		appRoutes:{
			'$5':'$4',
		}
	});

	Router.Controller = Marionette.Controller.extend({
		$4: function(){
			//console.log('$4')
			Jma.module('$2').StartApp();
		}
	});

	Router.on('start', function(){
		new Router.Router({
			controller: new Router.Controller
		});
	});

});";
		echo -e "$router" >> "$1/main/router.js"
		echo "$1/main/router.js已生成！\n"
		#生成dicts文件
		dicts="
/*
* 字典文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$3.Dicts', function(Dicts, Jma, Backbone, Marionette, $, _) {

	Dicts.demoDicts = 'demoDictsValue';

});";
		echo -e "$dicts" >> "$1/main/dicts.js"
		echo "$1/main/dicts.js已生成！\n"
		entities="
/*
* 数据文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$3.Entities', function(Entities, Jma, Backbone, Marionette, $, _){

	Entities.demoModel = Backbone.Model.extend({
		urlRoot : 'urlPath',
		parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

	Entities.demoCollection = Backbone.Collection.extend({
		url : 'urlPath',
		model:Entities.demoModel,parse: function(data){
			if(data.err){
				return '请求失败';
			}else{
				return data;
			}
		}
	});

})";
		echo -e "$entities" >> "$1/main/entities.js"
		echo "$1/main/entities.js已生成！\n"
		views="
/*
* 视图文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$3.Views',function(Views, Jma, Backbone, Marionette, $, _){

	Views.demoLayoutView = Marionette.LayoutView.extend({
		className: 'main-content',
		template: 'template',
		regions: {
			demoRegion : '#demo',
		},
        triggers:{
            'click .demo' : 'demo',
        },
        events: {
            'click .demo' : 'demo'
        },
        demo: function(){
        	console.log('demo for events function')
        }
    });

	Views.demomItemView = Marionette.ItemView.extend({
		template: 'template',
		initialize: function(){},
		getTemplate: function(){
			return '返回逻辑模板';
		},
		templateHelpers: function(){
            var self = this;
            return {
                demo: function(){
                	return 'value';
                }
            };
        },
		onRender: function(){},
		modelEvents: {
            'change': 'render',
        },
        triggers: {
            'change': 'render',
        }
	});

	Views.demomCollectionView = Marionette.CollectionView.extend({
		template: 'template',
		tagName: 'div',
        className: 'classname',
        childView: Views.demomItemView,
        emptyView: Views.demoEmptyView,
        triggers:{
            'change': 'render',
        }
	});

})";
		echo -e "$views" >> "$1/main/views.js"
		echo "$1/main/views.js已生成！\n"
		templates="
/*
* 模板文件
* createDate:$(date +%Y-%m-%d\ %k:%M:%S)
* author: XXXXXX
*/
Jma.module('$3.Templates', function(Templates, Jma, Backbone, Marionette, $, _){

	Templates.testTemplate = _.template('html代码');

});";
		echo -e "$templates" >> "$1/main/templates.js"
		echo "$1/main/templates.js已生成！\n"
    else
    	echo "\n$1已存在."
    fi
	return 1
}

path="src/scripts"
modelname=""
modelnamelower=""
if [ $# != 0 ]; then
	for arg in "$@"
	do
		# string="$(echo $1 | tr '[:lower:]' '[:upper:]')"
		string="$arg"
		first="$(echo ${string:0:1}  | tr '[:lower:]' '[:upper:]')"
		second=${string:1}
		if [ "$modelname" == "" ]; then
			modelSpace="$first$second"
		else
			modelSpace="$modelname.$first$second"
		fi
		if [ "$modelnamelower" == "" ]; then
			modelnamelower="$arg"
		else
			modelnamelower="$modelnamelower/$arg"
		fi
		path="$path/$arg"
		
	    echo -e $(createModule $path $modelSpace $first$second $arg $modelnamelower)
	    modelname="$first$second"
	done
else
	echo "缺参数！for example: . createModulejs.sh test"
fi













