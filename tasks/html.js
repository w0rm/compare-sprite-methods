
var gulp = require('gulp');
var gulpif = require('gulp-if');
var inject = require('gulp-inject');
var utils = require('../lib/utils');
var config = require('../config');

function injectSvgs(func) {
    var svgs = utils.duplicateSvgs(config.SVG, {minify: false});
    return inject(svgs, {transform: func});
}

gulp.task('html', 'Generate necessary html files', function () {
    return gulp
      .src(config.HTML)
      .pipe(gulpif(/svgstore\.html$/, injectSvgs(utils.svgUseTag)))
      .pipe(gulpif(/fallback\.html$/, injectSvgs(utils.fallbackTag)))
      .pipe(gulpif(/data\-urlencode\.html$/, injectSvgs(utils.cssSpriteTag)))
      .pipe(gulpif(/data\-base64\.html$/, injectSvgs(utils.cssSpriteTag)))
      .pipe(gulpif(/css\-sprite\.html$/, injectSvgs(utils.cssSpriteTag)))
      .pipe(gulpif(/iconfont\.html$/, injectSvgs(utils.cssSpriteTag)))
      .pipe(gulp.dest(config.DEST));
});
