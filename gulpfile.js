var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var config = {
	js: 'js/**/*.js',
  	images: 'images/*.*',
  	fonts: 'fonts/*.*',
  	html: 'templates/*.html',
	temp: 'temp/'
}

var dist = {
	path: 'dist/',
	images: 'images/',
	fonts: 'fonts/'
}

gulp.task('build', ['copy-fonts', 'copy-images', 'minifyjs'], function(){
  del(config.temp);
});

gulp.task('minifyjs', ['useref', 'templatecache'], function(){
  return gulp.src(['dist/js/scripts.js', 'temp/templates.js'])
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('useref', ['vet', 'clean-js', 'clean-styles'], function(){
  var assets = useref.assets();

  return gulp.src('index.html')
  .pipe(assets)
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', ['clean-images'], function(){
  return gulp.src([config.images])
    .pipe(gulp.dest(dist.path + dist.images));
});


gulp.task('copy-fonts', ['clean-fonts'], function(){
  return gulp.src([config.fonts])
    .pipe(gulp.dest(dist.path + dist.fonts));
});

gulp.task('vet', function(){
  return gulp.src([
    config.js
  ])
  .pipe(jshint())
  .pipe(jscs())
  .pipe(jshint.reporter('jshint-stylish'), {verbose: true})
  .pipe(jshint.reporter('fail'));
});

gulp.task('templatecache', function() {
  return gulp.src(config.html)
    .pipe(minifyHtml({empty: true}))
    .pipe(angularTemplatecache(
      'templates.js', {
        module: 'todomvc',
        standAlone: false,
        root: 'templates/'
      }
    ))
    .pipe(gulp.dest(config.temp));
});

//Helper Tasks
gulp.task('clean-images', function(){
  del(dist.path + dist.images);
});

gulp.task('clean-fonts', function(){
  del(dist.path + dist.fonts)
});

gulp.task('clean-js', function(){
  del(dist.path + dist.js)
});

gulp.task('clean-styles', function(){
  del(dist.path + dist.css)
});