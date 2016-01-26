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
