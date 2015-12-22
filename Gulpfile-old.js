var gulp         = require('gulp'),
    gutil        = require('gulp-util'),
    connect      = require('gulp-connect'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps')
    sasslint     = require('gulp-scss-lint'),
    minifycss    = require('gulp-minify-css'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

// Sass Task
gulp.task('styles', function() {
  return gulp.src('./scss/**/*.scss')
  .pipe(sass({style: 'compressed', sourcemap: true}))

  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css/'))
  .pipe(connect.reload());
});

// Sass Lint Task
gulp.task('sass-lint', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sasslint({
      'config': '.scss-lint.yml'
    }));
});

// Connect Task
gulp.task('connect', function(){
  connect.server({
    port: 8989,
    livereload: true
  });
});

// Sass Minify Task
gulp.task('sass-minify', function() {
  return gulp.src('./css/main.css')
  // First, save the unminified version
  .pipe(gulp.dest('./dist/css'))
  // Now rename
  .pipe(rename({suffix: '.min'}))
  // Actually minify the file
  .pipe(minifycss())
  // And then save it again with its new name
  .pipe(gulp.dest('dist/css'));
});


// Watch task
gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss',['styles', 'sass-lint']);
});
// Build Task
gulp.task('build', ['styles', 'sass-minify']);
// Default Task
gulp.task('default', ['styles', 'sass-lint', 'watch', 'connect']);
