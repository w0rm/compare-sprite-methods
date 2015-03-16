var gulp = require('gulp');
var config = require('../config');

gulp.task('js', 'Copy javascript files', function () {
    return gulp
      .src(config.JS)
      .pipe(gulp.dest(config.DEST_JS));
});
