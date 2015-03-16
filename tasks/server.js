var gulp = require('gulp');
var connect = require('connect');
var serveStatic = require('serve-static');
var http = require('http');
var config = require('../config');

gulp.task('server', 'Start the server on port 8888', ['build'], function () {
    var app = connect().use(serveStatic(config.DEST));
    var server = http.createServer(app);
    server.listen(process.env.PORT || 8888);
});
