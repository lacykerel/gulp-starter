var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function() {
  return sass('./scss/**/*.scss', {style: 'expanded'})
    .pipe(gulp.dest('./css'))
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
  gulp.watch('js/*.js', ['lint', 'scripts']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
