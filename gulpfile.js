// 引入gulp
var gulp = require('gulp');       // 基础库
// sass模块
var sass = require('gulp-sass');
// webserver服务器
var webserver = require('gulp-webserver'); 
// 监控模块
var watch = require('gulp-watch');
// 丑化模块
var uglify = require('gulp-uglify');
// 引入gulp插件
 // 网页自动刷新（服务器控制客户端同步刷新）
var livereload = require('gulp-livereload');
// 本地服务器
var  webserver = require('gulp-webserver'); 
// mock数据
var url = require('url');//这是内置的，不用安装
// FileSystem
var fs = require('fs');//这是内置的，不用安装
// 打包模块
var webpack = require('gulp-webpack');
// 命名模块
//var named = require('vinyl-named');

// js模块化
var jsFiles = [
  'src/index.js'
];

//打包js
gulp.task('packjs', function() {
  return gulp.src(jsFiles)
   // .pipe(named())
    .pipe(webpack())
    .pipe(uglify())
    .pipe(gulp.dest('www/js'))
});

// 注册任务
gulp.task('webserver', function() {
  gulp.src( './' ) // 服务器目录（./代表根目录）
  .pipe(webserver({ // 运行gulp-webserver
    livereload: true, // 启用LiveReload
    open: true // 服务器启动时自动打开网页
  }));
});
 
// 监听任务
gulp.task('watch',function(){
  // 监听根目录下所有.html文件
  gulp.watch( '*.html', ['html']); 
   // 监听 scss
  gulp.watch('src/sass/*.scss', ['sass']);
});
 
// 默认任务
gulp.task('default',['webserver','watch']);

// 复制首页文件
gulp.task('copy-index', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./www'))
})
// 图片复制
gulp.task('images', function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('www/images'));
});
// js插件复制
gulp.task('js', function() {
  return gulp.src('src/js/*')
    .pipe(gulp.dest('www/js'));
});
// css插件复制
gulp.task('css', function() {
  return gulp.src('src/css/*')
    .pipe(gulp.dest('www/css'));
});
//编译sass将scss转换成css
gulp.task('sass', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('www/css'));
});