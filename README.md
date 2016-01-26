# gruntorgulp
To Grunt or to Gulp?

You may have heard chatter between popular Node based automaters like Grunt and Gulp. What's the difference? Which is better? Interestingly enough, the two build systems handle how they run your tasks fundamentally different from one another. Understanding this distinction will help you choose which build system is right for your current project.

First, let's create a simple Grunt configuration that fetches some Sass dependencies, copies them into place, and writes our Sass into both minified and unminified CSS files.

## Grunt
Checkout the start branch.
```
git clone -b start git://github.com/jpdevries/gruntorgulp.git
```

Notice we've provided you with a really basic `gruntfilejs` in the `_build` directory. Any files we will not be delivery to the end user, such as Grunt, node_modules, bower_modules, or Sass files is stored in a `_build` directory which we essentially ignore when uploading our project to a webserver.

```js
module.exports = function(grunt) {
  var initConfig = {
    pkg:grunt.file.readJSON('package.json'),
    dirs:{
      'theme':'../',
      'lib':'./lib/',
      'scss':'./scss/',
      'assets':'assets/',
      'css':'css/',
      'js':'js/'
    }
  };

  grunt.initConfig(initConfig);

};
```

Notice that we are simply creating an `initConfig` Object and passing it into grunt.initConfig(). Yes, this is going to be a big fancy Object, but that is all it is. Just a big fancy object!

Each of our configurations for tasks are added as properties to this Object. Notice the `initConfig.dirs` Object I've started you out with. In this Object, manage your file paths relative to `_build`. This will allow you to use the [Grunt Template syntax](http://gruntjs.com/api/grunt.template) to reference these directies as placeholders. Notice how placeholders for the `./lib` and `./scss/` directories are used in the `grunt copy` config below:

```js
initConfig.copy = {
  scss: { /* copy Sass dependencies from the `./lib` directory into our `./scss/` directory  */
    files:[
      {src:'bourbon/**/*',cwd:'<%= dirs.lib %>',dest:'<%= dirs.scss %>',expand:true},
      {src:'neat/**/*',cwd:'<%= dirs.lib %>',dest:'<%= dirs.scss %>',expand:true}
    ]
  }
};
```

That's slick. This way if you need to move your non-production files or your production files around at all you can just update the filepaths all in one spot. We also read the `package.json` using `grunt.file.readJSON()`. This allows you to access any of the properties defined in your `./packages.json` file using the Grunt Template Syntax as well.

### Fetching Components with Bower
What's this `./lib` directory? That is where our `bower_components` get copied to. What's are `bower_components`? Bower allows us to define dependencies similar to how we do so with Node and a `package.json`. Bower will fetch these versions for you, based on the versions you request, from Github. Using `exportsOverrides` you can control which files you copy from the source code.

Create a `grunt bower` task that fetches from Bower and stores your files, according to `exportsOverrides` in a temporary `./lib/` directory. This `./lib/` directory will get deleted at the end of our `grunt build` task but we you'll use it as a means of easily copying the files we want, and only the files we want, from into our destination `./scss/` directory. So to recap, you'll use `grunt bower` to fetch the Bourbon and Neat directories, copy just the `app/assets/stylesheets/` directories into `./lib/bourbon/` and `./lib/neat/` directories respectively. You'll then use `grunt copy` to simply copy the contents of `./lib/` into `./scss/`.

### Copying Bower Componenents Into Place
Whoops. I gave this one away. Notice the `initConfig.copy` example above. There we are defining a `grunt copy:scss` task (which as a subtask will be run whenenver `grunt copy` is run) and copy our files to where we want them.

### Use our Fresh Dependency
So we just used Grunt to:

 - automate the process of fetching the versions and dependencies defined in `./bower.json`
 - copy files into place
 
 Now it is time to use these things. Create a `./scss/main.scss` file that uses Bourbon and Neat:
 
 ```scss
@import "bourbon/bourbon";
@import "neat/neat";

.wrapper {
  @include outer-container;
}
 ```
 
### Build your Sass
Sass is great, but it needs to get preprocessed into CSS somewhere along the line. We better get to it then. Add a `sass` configuration to your `initConfig` that writes your `main.scss` file to a `main.css` file located in the `assets/css/` directory.
 
### Minify CSS
Now that we have a `assets/css/main.css` file (remember that would be `../assets/css/main.css` relative to our `build` directory) add a `cssmin` property to the `initConfig` Object that minifies your `main.css` file to a `main.min.css` file.
 
### Watch For Changes
You should now be able to
```bash
cd _build
grunt bower
grunt copy
grunt sass
```
 
The next step is to watch our `_build/scss/*.scss` files for changes and automatically run the `grunt sass` and `grunt cssmin` tasks when changes are made. Before we do that though, use `grunt.registerTask()` to register a `grunt build` task that runs the above commands consequitvely in order.
 
You should now be able to run `grunt build` and see that your commands are run one after another. 

Congratulations, you've completed the Grunt portion of this excercise. We haven't run into any issues yet, but don't worry we will before we get to the end of this whole Grunt vs Gulp thing. Checkout the gulp-start branch and have a look at the Gulp version of this excercise next.
 
