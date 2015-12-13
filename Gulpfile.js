var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    gutil        = require('gulp-util'),
    connect      = require('gulp-connect'),
    rename       = require('gulp-rename'),
    minifycss    = require('gulp-minify-css'),
    sasslint     = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps');

// Sass Task
gulp.task('sass', function() {
  return sass('sass/main.scss', {
    'sourcemap': true,
    'style': 'expanded',
    'lineNumbers': true
  })
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({ browsers: ['last 2 version', 'Firefox < 20', '> 5%'] }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css/'));
});

// Sass Lint Task
gulp.task('sass-lint', function() {
  return gulp.src('sass/main.scss')
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
  return gulp.src('css/main.css')
  // First, save the unminified version
  .pipe(gulp.dest('dist/css'))
  // Now rename
  .pipe(rename({suffix: '.min'}))
  // Actually minify the file
  .pipe(minifycss())
  // And then save it again with its new name
  .pipe(gulp.dest('dist/css'));
});


// Watch task
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss',['sass']);
});
// Build Task
gulp.task('build', ['sass', 'sass-minify']);
// Default Task
gulp.task('default', ['sass', 'sass-lint', 'connect', 'watch']);
