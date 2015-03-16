var lazypipe = require('lazypipe');
var gulpif = require('gulp-if');
var clone = require('gulp-clone');
var rename = require('gulp-rename');
var cheerio = require('cheerio');
var gulpCheerio = require('gulp-cheerio');
var path = require('path');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

function getSvgAttributes (filePath, file) {
    var contents = file.contents.toString();
    var $ = file.cheerio || cheerio.load(contents, { xmlMode: true });
    var $svg = $('svg');
    return {
        width: $svg.attr('width'),
        height: $svg.attr('height'),
        name: path.basename(file.relative, path.extname(file.relative)),
        contents: contents
    };
}

function cssSpriteTag (filePath, file) {
    var attrs = getSvgAttributes(filePath, file);
    return '<i class="icon icon-' + attrs.name + '"></i>\n';
}

function svgUseTag (filePath, file) {
    var attrs = getSvgAttributes(filePath, file);
    return '<svg class="icon icon-' + attrs.name + '"\n' +
           '     width="' + attrs.width + '" height="' + attrs.height + '">\n' +
           '    <use xlink:href="#icon-' + attrs.name + '"></use>\n' +
           '</svg>\n';
}

function fallbackTag (filePath, file) {
    var attrs = getSvgAttributes(filePath, file);
    return '<i class="icon icon-' + attrs.name + '">\n' +
           '    <svg width="' + attrs.width + '" height="' + attrs.height + '">\n' +
           '        <use xlink:href="#icon-' + attrs.name + '"></use>\n' +
           '    </svg>\n' +
           '</i>\n';
}

function isOriginal (file) {
    return !/\-dup\-\d+\.svg$/.test(file.path);
}

function copy (n) {
    var sink;
    return (lazypipe()
        .pipe(function () {
            sink = clone.sink();
            return sink;
        })
        .pipe(rename, {suffix: '-dup-' + n})
        .pipe(function () {
            return sink.tap();
        })
    )();
}

function duplicateSvgs(path, options) {
    options = options || {minify: true};
    var stream = gulp.src(path);

    if (options.minify) {
        stream = stream.pipe(imagemin({
            svgoPlugins: [{mergePaths: false}] // https://github.com/svg/svgo/issues/298
        }));
    }

    // Duplicate icons
    for (var i = 1; i<= 10; i++) {
        stream = stream.pipe(gulpif(isOriginal, copy(i)));
    }

    // Fix missing dimensions of evil-icons
    stream = stream.pipe(gulpCheerio({
        run: function ($) {
            $('svg').attr('width', 50);
            $('svg').attr('height', 50);
        },
        parserOptions: {
            xmlMode: true
        }
    }));

    return stream;
}

module.exports = {
    getSvgAttributes: getSvgAttributes,
    duplicateSvgs: duplicateSvgs,
    cssSpriteTag: cssSpriteTag,
    svgUseTag: svgUseTag,
    fallbackTag: fallbackTag
};
