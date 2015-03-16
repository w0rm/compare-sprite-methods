var gulp = require('gulp');

gulp.task('build', [
    'html',
    'svgstore',
    'svgfallback',
    'data-base64',
    'data-urlencode',
    'iconfont',
    'js'
]);
