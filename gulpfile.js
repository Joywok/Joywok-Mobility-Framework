'use strict';
let gulp = require('gulp');//引入gulp
let del = require('del');//引入删除文件
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let htmlmin = require('gulp-htmlmin');
let $ = require('gulp-load-plugins')();
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');
let minifycss = require('gulp-minify-css');
let express = require('express');
let gulpif = require('gulp-if');
let router = express.Router();

gulp.task('styles:sass', ()=>{
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
   sass(['src/scss/*.scss'],{
      style: 'expanded',
      precision: 10
      })
  .on('error', console.error.bind(console))
  .pipe(gulp.dest('src/styles'))
  .pipe(gulp.dest('build/styles'))
  .pipe($.size({title:'build/styles'}));
});
gulp.task('styles', ['styles:sass']);
gulp.task('mini',function(){
	return gulp.src('src/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/images'));
})
gulp.task('concatRoutes',function(){
  var concat = require('gulp-concat');
  gulp.src(['routers/a.js','routers/router/*.js','routers/b.js'])
    .pipe(concat('router.js'))
    .pipe(gulp.dest('routers'))
})
gulp.task('public',()=>{
  return gulp.src('src/public/index.html')
    .pipe(useref({searchPath: '.',}))
    .pipe(gulpif('*.css', minifycss()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/public/'));
})
gulp.task('default',["styles",'concatRoutes'],function(){
  gulp.watch(['routers/router/*.js'],['concatRoutes']);
  gulp.watch(['src/public/*.html'],['html']);
  gulp.watch(['src/scss/*.scss'],['styles:sass']);
});






