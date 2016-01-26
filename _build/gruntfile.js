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
    },
    bower: {
      install: {
        options: {
          targetDir:'./lib',
          layout:'byComponent'
        }
      }
    },
    copy: {
      misc: {
        files:[
          {src:'bourbon/**/*',cwd:'<%= dirs.lib %>',dest:'<%= dirs.scss %>',expand:true},
          {src:'neat/**/*',cwd:'<%= dirs.lib %>',dest:'<%= dirs.scss %>',expand:true}
        ]
      }
    },
    clean: { /* take out the trash */
			postbuild: ['<%= dirs.lib %>']
		},
    sass:{
      dev:{
        options:{
          style: 'expanded',
          compass: false,
        },
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css': '<%= dirs.scss %>main.scss'
        }
      }
    },
    cssmin:{
      ship: {
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.min.css': '<%= dirs.theme %><%= dirs.assets %><%= dirs.css %>main.css'
        }
      }
    },
    watch: { /* trigger tasks on save */
      options: {
        livereload: true
      },
      scss: {
        options: {
          livereload: false
        },
      files: '<%= dirs.scss %>**/*.scss',
      tasks: ['sass','cssmin', 'growl:sass']
      }
    },
    growl: { /* optional growl notifications requires terminal-notifer: gem install terminal-notifier */
			sass: {
				message: "Sass files created.",
				title: "grunt"
			},
			build: {
				title: "grunt",
				message: "Build complete."
			},
			watch: {
				title: "grunt",
				message: "Watching. Grunt has its eye on you."
			}
		}
  };

  grunt.initConfig(initConfig);

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('default','watch','growl:watch');
  grunt.registerTask('build',['bower','copy','sass','cssmin','clean','growl:build']);

};
