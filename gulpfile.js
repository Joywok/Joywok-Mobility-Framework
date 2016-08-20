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




gulp.task('serve',function(){
    browserSync({
        notify: false,
        server: {
            baseDir: ['src', 'test','.'],
            routes:{
                "/bower_components":"bower_components"
            }
        }
    });
});

gulp.task('default', ['serve']);









