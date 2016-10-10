var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('css', function(){
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
  var fs = require('fs');
  fs.readdir('scss', function(err, files){
    if (err) {
      console.log('read dir error');
    }else{
      files.forEach(function(item){
        console.log(item,'123123');
        var appsName = item.indexOf('.scss') != -1 ? item.replace('.scss', '') : '';
        if(appsName !== ''){
          sass(['scss/'+item])
            .on('error', console.error.bind(console))
            .pipe(concat(appsName+'.css'))
            .pipe(gulp.dest('css'))
            .pipe($.size({title: 'styles:sass:'+appsName+'.css'}));
        }
      })
    }
  })
})

gulp.task('default',function(){
})