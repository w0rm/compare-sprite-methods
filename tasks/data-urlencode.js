var gulp = require('gulp');
var utils = require('../lib/utils');
var config = require('../config');
var inject = require('gulp-inject');
var rename = require('gulp-rename');

function cssSpriteStyleUrlencode (filePath, file) {
    var attrs = utils.getSvgAttributes(filePath, file);
    return '.icon-' + attrs.name + ' {\n' +
           '    width: ' + attrs.width  + 'px;\n' +
           '    height: ' + attrs.height  + 'px;\n' +
           '    background: url(data:image/svg+xml,' +
                                encodeURIComponent(attrs.contents) +
                                ');\n' +
           '}\n';
}

gulp.task('data-urlencode', 'Generate CSS file with url-encoded SVGs', function () {
    var svgs = utils.duplicateSvgs(config.SVG);
    return gulp
        .src(config.CSS_DATA_URI)
        .pipe(inject(svgs, {
             transform: cssSpriteStyleUrlencode,
             starttag: '/* inject:svg */',
             endtag: '/* endinject */'
         }))
        .pipe(rename('data-urlencode.css'))
        .pipe(gulp.dest(config.DEST_CSS));
});
