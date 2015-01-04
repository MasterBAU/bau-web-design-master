var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    sass         = require('gulp-sass'),
    browsersync  = require('browser-sync'),
    config       = require('../../config');

gulp.task('sass', function() {
    browsersync.notify('Compiling Sass');

    return gulp.src(config.sass.src)
        .pipe(plumber(config.plumber))
        .pipe(sass())
        .pipe(gulp.dest( config.sass.dest ))
});