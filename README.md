# gruntorgulp
To Grunt or to Gulp?

Ok, so you've completed the first portion of this excercise by creating the automation with Grunt. Now let's do the same thing with Gulp.

## Gulp
Checkout the gulp-start branch.
```
git clone -b gulp-start git://github.com/jpdevries/gruntorgulp.git
```

Notice we've provided you with a really basic `gulpfile.js` in the `_build` directory. Any files we will not be delivery to the end user, such as Gulp, node_modules, bower_modules, or Sass files is stored in a `_build` directory which we essentially ignore when uploading our project to a webserver.

```js
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
```

Notice that we are simply loading the modules we will use using `require()`. Gulp does not have a Template Syntax like Grunt, but we'll still use the `dirs` Object store all our paths in one spot.

### Fetching Components with Bower
Each of our configurations for tasks are added using `gulp.task()`. Within the gulp task, we use a method chaining similar to what you may be used to in jQuery as a series of "hooks" to make the changes we need. For example notice below how we create a `gulp bower` task that fetches our depdencies using Bower and copies them into the `./lib/` directory.

```js
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(dirs.lib));
});
```

We evoke the `bower()` method and then pipe its output to the `dirs.lib` directory.



Create a `gulp copy-bourbon` task and a `gulp copy-neat` task that copy the files from the respective `bower_components` into your `./scss/` directory. Once your two copy tasks are complete, create a `gulp copy` shortcut that runs them both:

```js
gulp.task('copy', ['copy-bourbon','copy-neat']);
```

Run your `grunt copy` task and verify that it copies the files approripately. Awesome. Notice anything different yet?

### Gulp your Sass
Create a `gulp sass` task that outputs your `_build/scss/main.scss/` file to `/assets/css/main.css`.

### Minify your CSS
Now that your `gulp sass` task is set up, minify your stylesheet to a `main.min.css` file. We'll do this one together, because there is a trick:

```js
gulp.task('cssmin', function () {
	gulp.src(dirs.theme + dirs.assets + dirs.css + 'main.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dirs.theme + dirs.assets + dirs.css));
});
```

Notice the use of `rename({suffix: '.min')` to change our file name. Crafty.

### Watching For Changes
Add a `gulp watch` task that watches the `./scss/*.scss` files for change sand runs the `gulp sass` and `gulp cssmin` tasks one after the other. Just like Grunt did. Remember?

### Cleaning up your Temporary Files
Create a `gulp clean` task that removes the `./lib/` directory.

### Running your Gulp Tasks In Order?
Create `gulp watch` and `gulp build` shorctuts for your build process.

```js
gulp.task('default',['watch']);
gulp.task('build', ['bower','copy','sass','cssmin','clean']);
```

Run your `gulp build` tasks. Hm, something isn't right. Gulp tried to copy our files before bower had checked them out into place. Also it tried to minify the CSS file before it was created. And it tried to delete the `./lib/` directory before we had copied the files from it! How could this be?

Grunt runs tasks syncrounously one after another. Unlike Grunt, Gulp runs tasks asyncrounous. This means Gulps runs all your tasks at once! If you are creating a build system whos tasks don't overlap or rely on eachother being run in a certain order, Gulp will never do you wrong. 
