'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var argv = require('yargs').argv;
var packageJson = require('./package.json');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var debug = require('gulp-debug');
var git = require('gulp-git');
var path = require('path');
var minimist = require('minimist');
var pkg = require('./package.json');

var concat = require('gulp-concat');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


var express = require('express');
var router = express.Router();
var _ = require('underscore');
var fs = require('fs');


gulp.task('concatRoutes',function(){
  var concat = require('gulp-concat');
  gulp.src(['routers/a.js','routers/router/*.js','routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})


gulp.task('css', function(){
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
  var fs = require('fs');
  fs.readdir('src/scss/apps', function(err, files){
    if (err) {  
      console.log('read dir error');
    }else{
      files.forEach(function(item){
        var appsName = item.indexOf('.scss') != -1 ? item.replace('.scss', '') : '';
        if(appsName !== ''){
          sass(['src/scss/apps/'+item])
          .on('error', console.error.bind(console))
          .pipe(concat(appsName+'.css'))
          .pipe(gulp.dest('build/css'))
          .pipe($.size({title: 'styles:sass:'+appsName+'.css'}));  
        }
        
      })
    }
  })

})


gulp.task('js', function () {
  var rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

  var fs = require('fs');
  fs.readdir('src/scripts', function(err, files){
    if (err) {  
      console.log('read dir error');
    }else{
      files.forEach(function(item){
        if(item != '.DS_Store'){
          gulp.src('src/scripts/'+item+'/**/*.js')
           .pipe(concat(item+'.js'))    //合并所有js到main.js
           .pipe(gulp.dest('build/js'))    //输出main.js到文件夹
           .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
           .pipe(uglify())    //压缩
           .pipe(gulp.dest('build/js'));  //输出
           console.log(item+'打包完成');
        }
        
      })
    }
  })

});


gulp.task('public:css',function(){
  gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css','bower_components/font-awesome/css/font-awesome.css','bower_components/bootstrap-select/dist/css/bootstrap-select.css','mobilecsscomponents/joywok-mobile.css'])
    .pipe(concat('index.css'))
    .pipe(gulp.dest('.'))
    .pipe($.size({title:'index.css'}));
})

gulp.task('public:js:framework',function(){
  gulp.src(['bower_components/jquery/dist/jquery.js','bower_components/bootstrap/dist/js/bootstrap.min.js','bower_components/underscore/underscore.js','bower_components/backbone/backbone.js','bower_components/backbone.wreqr/lib/backbone.wreqr.js','bower_components/backbone.babysitter/lib/backbone.babysitter.js','bower_components/marionette/lib/core/backbone.marionette.js','bower_components/backbone-forms/distribution/backbone-forms.js','bower_components/moment/moment.js','bower_components/bootstrap3-dialog/dist/js/bootstrap-dialog.js','bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.js','bower_components/bootstrap-select/dist/js/bootstrap-select.js','bower_components/backbone-forms/distribution/backbone-forms.js','bower_components/uploader/uploader.js'])
    .pipe(concat('framework.js'))
    .pipe(gulp.dest('.'))
    .pipe($.size({title:'framework.js'}));
})

gulp.task('public:js:index',function () {
  gulp.src(['src/scripts/main/index.js'])
    .pipe(gulp.dest('.'))
    .pipe($.size({title:'index.js'}));

  gulp.src(['src/scripts/main/dicts.js','src/scripts/main/funcs.js','src/scripts/main/templates.js','src/scripts/main/entities.js','src/scripts/main/views.js','src/scripts/main/fix.js','src/scripts/main/comonents.js','src/scripts/main/widgets.js','src/scripts/main/start.js'])
    .pipe(concat('components.js'))
    .pipe(gulp.dest('.'))
    .pipe($.size({title:'components.js'}));
})
gulp.task('public',['public:css','public:js:framework'],function () {

})


gulp.task('serve',['css','concatRoutes'],function(){
  var routerFs = require('./routers/router')(router);
  browserSync({
    notify: false,
    server: {
      baseDir: ['src', 'test','.'],
      routes:{
        "/bower_components":"bower_components",
        "/test":"test"
      },
      middleware:router
    }
  });

  gulp.watch(['routers/router/*.js'],['concatRoutes']);
  gulp.watch(['src/scss/apps/*.scss'],['css']);

});

gulp.task('default', ['serve']);









