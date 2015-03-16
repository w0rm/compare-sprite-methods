var gulp = require('gulp');
var consolidate = require('gulp-consolidate');
var iconfont = require('gulp-iconfont');
var config = require('../config');
var utils = require('../lib/utils');

gulp.task('iconfont', 'Create Icon Font and CSS file with icons', function () {
    return utils.duplicateSvgs(config.SVG)
        .pipe(iconfont({
            fontName: 'iconFont',
            normalize: true,
            fontHeight: 5000
         }))
        .on('codepoints', function (codepoints) {
            gulp.src(config.CSS_ICON_FONT)
                .pipe(consolidate('lodash', {
                  glyphs: codepoints,
                  fontName: 'iconFont',
                  fontPath: '../fonts/',
                  className: 's'
                }))
                .pipe(gulp.dest(config.DEST_CSS));
        })
        .pipe(gulp.dest(config.DEST_FONT));
});
