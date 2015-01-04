var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    plumber     = require('gulp-plumber'),
    jekyll      = require('gulp-jekyll'),
    config      = require('../../config');

gulp.task('jekyll', function() {
    return gulp.src('src/**/*.html')
        .pipe(plumber(config.plumber))
        .pipe(jekyll(config.jekyll))
});