var gulp = require('gulp');
var rename = require('gulp-rename');
var svgstore = require('gulp-svgstore');
var config = require('../config');
var utils = require('../lib/utils');

gulp.task('svgstore', 'Combine svg files into one', function () {
    return utils.duplicateSvgs(config.SVG)
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore())
        .pipe(gulp.dest(config.DEST_IMG));
});
