var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
// html
var htmlmin = require('gulp-htmlmin');
// js
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rollup = require('rollup-stream');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
//var rename = require('gulp-rename');
// css
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var path = {
  HTML: './src/*.html',
  JS:   './src/js/**/*.js',
  CSS:  './src/scss/**/*.scss',
  DEST: './dist'
};

gulp.task('default', ['styles', 'scripts', 'html'], function () {
  gulp.watch(path.JS, ['scripts']);
  gulp.watch(path.CSS, ['styles']);
  gulp.watch(path.HTML, ['html']);

  browserSync.init({
    server: './dist'
  });
  browserSync.stream();
});

gulp.task('styles', function() {
  return gulp.src(path.CSS)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(cleanCSS())
		.pipe(concat('bundle.css'))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.DEST))
});

gulp.task('scripts', function() {
  return gulp.src(path.JS)
    .pipe(sourcemaps.init())
    .pipe(babel({ plugins: ["transform-react-jsx"] }))
    //.pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('bundle.js'))
    //.pipe(uglify())
		.pipe(sourcemaps.write('.'))
    //.pipe(gulp.dest(path.DEST))
    .pipe(gulp.dest('.dist/temp/bundle.js'))
});

gulp.task('html', function() {
  return gulp.src(path.HTML)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.DEST))
});


gulp.task('rollup', function() {
  rollup({
    entry: './dist/temp/bundle.js',
    sourceMap: true
  })
  .pipe(source('bundle.js', './dist/temp/'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(rename('bundle.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist'));
});
