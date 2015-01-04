var gulp = require('gulp');
var config = require('../../config').watch;

gulp.task('watch', ['browsersync'], function() {
    gulp.watch(config.sass, ['sass']);
});