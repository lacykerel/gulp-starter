// Define Tasks
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    del          = require('del'),
    plumber      = require('gulp-plumber'),
    jshint       = require('gulp-jshint'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    connect      = require('gulp-connect'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    reload       = browserSync.reload;

// Configuration Variables 

var config = {
  scss  :['assets/scss/**/*.scss'],
  css   :['assets/css/'],
  html  :['index.html'],
  build :['build/'],
  src   :['./']
};

// Sass Tasks
gulp.task('styles', function(){
  return gulp.src(config.scss)
             // .pipe(sourcemaps.init())
             .pipe(sass({outputStyle: 'expanded'})
             .on('error', sass.logError))
             .pipe(autoprefixer('last 3 versions'))
             // .pipe(minifycss())
             // .pipe(rename({suffix: '.min'}))
             // .pipe(sourcemaps.write('./maps'))
             .pipe(gulp.dest(''+config.css+''))
             .pipe(reload({stream:true}));
});

// Html Tasks
gulp.task('html', function(){
  return gulp.src(config.html)
    .pipe(reload({stream:true}));
});

// Browser-sync Tasks
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: config.src
    }
  });
});

// Build Tasks
// Create build, clean un-necessary files and folders

// create build
gulp.task('build:create', function(){
  return gulp.src(config.src+'**/*')
             .pipe(gulp.dest(''+config.build+''));
});

// Clean build folder
gulp.task('build:clean',['build:create'], function(){
  return del(['build/bower_components/',
              'build/scss/',
              'build/css/!(*.min.css)',
              'build/js/!(*.min.js)'
            ]);
});

// preview build app Tasks
gulp.task('build:start', function() {
  browserSync({
    server: {
      baseDir: config.build
    }
  });
});

// remove build folder
gulp.task('build:delete', function(res){
  return del([config.build+'/**'], res);
});

// build task
gulp.task('build', ['build:create', 'build:clean']);

// Lint Task
gulp.task('lint', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('js*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist'))
      .pipe(rename('all.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

// Watch Files For changes
gulp.task('watch', function() {
  gulp.watch('./assets/js/*.js', ['lint', 'scripts']);
  gulp.watch(config.scss, ['styles']);
  gulp.watch(config.html, ['html']);
});

// Default Task
gulp.task('default', ['watch', 'browserSync', 'lint', 'styles', 'html']);
