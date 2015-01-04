var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    config      = require('../../config').browsersync.development;

gulp.task('browsersync', function() {
    browsersync(config);
});
