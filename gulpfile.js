/*
    gulpfile.js
    ===========
    Rather than manage one giant configuration file responsible
    for creating multiple tasks, each task has been broken out into
    its own file in ./tasks. Any files in that directory get
    automatically required below.
    To add a new task, simply add a new task file that directory.
    ./tasks/default.js specifies the default set of tasks to run
    when you run `gulp`.
*/

var gulp = require('gulp');
var requireDir = require('require-dir');

require('gulp-help')(gulp);

// Require all tasks in ./tasks
requireDir('./tasks');
