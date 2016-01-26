var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var clean = require('gulp-clean');

var dirs = {
  'lib':'./lib/',
  'theme':'./../',
  'assets':'./assets/',
  'scss':'./scss/',
  'css':'./css/'
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(dirs.lib));
});

gulp.task('copy-bourbon',function(){
    return gulp.src(dirs.lib + 'bourbon/app/assets/stylesheets/**/*',{
        base:dirs.lib + 'bourbon/app/assets/stylesheets/'
    }).pipe(gulp.dest(dirs.scss + 'bourbon/'));
});

gulp.task('copy-neat',function(){
    return gulp.src(dirs.lib + 'neat/app/assets/stylesheets/**/*',{
        base:dirs.lib + 'neat/app/assets/stylesheets/'
    }).pipe(gulp.dest(dirs.scss + 'neat/'));
});

// Compile Sass task
gulp.task('sass', function() {
  return gulp.src(dirs.scss + '*.scss')
    .pipe(sass())
    .pipe(gulp.dest(dirs.theme + dirs.assets + dirs.css));
});

gulp.task('cssmin', function () {
	gulp.src(dirs.theme + dirs.assets + dirs.css + 'main.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dirs.theme + dirs.assets + dirs.css));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(dirs.scss + '*.scss', ['sass','cssmin']);
  gulp.watch('site/css/*.css', ['sass']);
});

gulp.task('clean', function () {
	return gulp.src(dirs.lib, {read: false})
		.pipe(clean());
});

gulp.task('copy', ['copy-bourbon','copy-neat']);
gulp.task('default',['watch']);
gulp.task('build', ['bower','copy','sass','cssmin','clean']);
