var gulp = require('gulp');
var rename = require('gulp-rename');
var svgfallback = require('gulp-svgfallback');
var config = require('../config');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var utils = require('../lib/utils');

gulp.task('svgfallback', 'Generate css sprite with png image', function () {
    return utils.duplicateSvgs(config.SVG)
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgfallback({
            backgroundUrl: '../img/icons.png'
        }))
        .pipe(gulpif(/\.png$/, imagemin()))
        .pipe(gulpif(/\.png$/, gulp.dest(config.DEST_IMG)))
        .pipe(gulpif(/\.css$/, rename('fallback.css')))
        .pipe(gulpif(/\.css$/, gulp.dest(config.DEST_CSS)));
});
