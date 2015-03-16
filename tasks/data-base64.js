var gulp = require('gulp');
var utils = require('../lib/utils');
var base64 = require('js-base64').Base64;
var config = require('../config');
var inject = require('gulp-inject');
var rename = require('gulp-rename');

function cssSpriteStyleBase64 (filePath, file) {
    var attrs = utils.getSvgAttributes(filePath, file);
    return '.icon-' + attrs.name + ' {\n' +
           '    width: ' + attrs.width  + 'px;\n' +
           '    height: ' + attrs.height  + 'px;\n' +
           '    background: url(data:image/svg+xml;base64,' +
                                base64.encode(attrs.contents) +
                                ');\n' +
           '}\n';
}

gulp.task('data-base64', 'Generate css file with base64-encoded svgs', function () {
    var svgs = utils.duplicateSvgs(config.SVG);
    return gulp
        .src(config.CSS_DATA_URI)
        .pipe(inject(svgs, {
             transform: cssSpriteStyleBase64,
             starttag: '/* inject:svg */',
             endtag: '/* endinject */'
         }))
        .pipe(rename('data-base64.css'))
        .pipe(gulp.dest(config.DEST_CSS));
});
