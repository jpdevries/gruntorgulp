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
