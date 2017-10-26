var gulp = require('gulp'),
sass = require('gulp-sass'),
pug = require('gulp-pug'),
browserSync = require('browser-sync'),
webpack = require('webpack'),
fs = require('fs-extra');


// delete build directory
gulp.task('clean', function() {
  fs.removeSync('./build');
  console.log("Success deleted");
});

// HTML
gulp.task('copyHTML', function() {
  return gulp.src('./dev/index.html')
    .pipe(gulp.dest('./build'))
});


//copy img directory
gulp.task('copyImg', function(){
  var src = "./dev/assets/img";
  var dist = "./build/assets/img";
  fs.copySync(src, dist);
})


// sass
gulp.task('sass', function() {
  return gulp.src('./dev/assets/stylesheets/**/*.scss')
    .pipe(sass({
        outputStyle: 'expanded',
        errLogToConsole:true,
        includePaths: [
          './',
          './dev/assets/stylesheets',
          './node_modules/normalize-scss/sass',          
        ]
    }))
    .on('error', function(errorInfo){
      console.log(errorInfo.toString());
      this.emit('end');
    })            
    .pipe(gulp.dest('./build/assets/stylesheets/'));
});


// pug
gulp.task('pug', function() {
  return gulp.src('./dev/*.pug')
  .pipe(pug({
    pretty: true,
    doctype: 'html'
  }))
  .on('error', function(errorInfo){
    console.log(errorInfo.toString());
    this.emit('end');
  }) 
  .pipe(gulp.dest('./build/'))
});


// pug refresh after 'pug' task's finished
gulp.task('HTMLRefresh', ['copyHTML'], function() {
  browserSync.reload();
});


// browserSync
gulp.task('browser-sync', function(){
  browserSync.init(['dev/index.html', 'build/index.html', 'build/assets/stylesheets/*.css', 'dev/assets/scripts/**/*.js', 'build/assets/scripts/*.js'],
    {
      server: {
        baseDir: "./build/"
      }
    });
});


// webpack for scripts
gulp.task('scripts', function(callback) {
  webpack( require('./webpack.config.js'), function(err, stats) {
    if (err) {
      console.log( err.toString() );
    }
     console.log( stats.toString() );
    callback();
  });
});

// scripts refresh after 'scripts' task's finished
gulp.task('scriptsRefresh', ['scripts'], function(){
  browserSync.reload();
});

// watch
gulp.task('watch', ['clean', 'copyHTML', 'scripts', 'copyImg','sass', 'browser-sync'], function(){
  gulp.watch(['./dev/assets/stylesheets/**/*.scss'], ['sass']);
  // gulp.watch(['./dev/*.pug'], ['pugRefresh'] );
  gulp.watch(['./dev/*.html'], ['HTMLRefresh']);
  gulp.watch(['./dev/assets/scripts/**/*.js'], ['scriptsRefresh']);
  gulp.watch(['./dev/assets/img/*.*'], ['copyImg']); 
})