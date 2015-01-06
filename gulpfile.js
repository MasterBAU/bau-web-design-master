var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    beep        = require('beepbeep'),
    colors      = require('colors'),
    plumber     = require('gulp-plumber'),
    sass        = require('gulp-sass'),
    jekyll      = require('gulp-jekyll'),
    concat      = require('gulp-concat'),
    merge       = require('merge-stream'),
    del         = require('del'),
    changed     = require('gulp-changed'),
    runSequence = require('run-sequence');


// ERROR HANDLER ========================================
var onError = function(err) {
    beep([200, 200]);
    console.log(
    '\n*****************'.bold.gray + ' \\(°□°)/ '.bold.red + '<( ERROR! ) '.bold.blue + '*****************\n\n'.bold.gray +
    String(err) +
    '\n*******************************************************\n'.bold.gray );
    browsersync.notify(String(err), 5000);
    this.emit('end');
};


// CLEAN ================================================
gulp.task('clean', function(callback) {
    del(
        ['.tmp/**/*.*', 'dist/**/*.*'],
        function(err, deletedFiles) {
            console.log('Files deleted:\n'.bold.green , deletedFiles.join(',\n '));
            callback();
    });
});


// HTML ==================================================
gulp.task('jekyll', function() {
    return gulp.src('src/**/*.html')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(jekyll({
            source: 'src',
            destination: '.tmp/jekyll',
            config: '_config.yml',
            bundleExec: true
        }));
});
gulp.task('copy-html', ['jekyll'], function() {
    return gulp.src('.tmp/jekyll/**/**.*')
        .pipe(gulp.dest('dist'));
});
gulp.task('html', ['copy-html'], function() {
    return browsersync.reload();
});


// STYLES ===============================================
gulp.task('css', function() {
    return gulp.src('src/_scss/*.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});


// FONTS ================================================
gulp.task('fonts', function() {
    return gulp.src('src/_fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
});


// JS ===================================================
gulp.task('js', function() {
    var scripts =  gulp.src(['src/_js/**/*.js', '!src/_js/reveal/*.js'])
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));

    var scripts_min =  gulp.src('src/_js/reveal/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('dist/js/reveal'));

    return merge(scripts, scripts_min);
});


// IMAGES ===============================================
gulp.task('images', function() {
    return gulp.src('src/_img/**/*.+(png|jpg|gif)')
        .pipe(changed('dist/img'))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('svg', function() {
    return gulp.src('src/_img/**/*.svg')
        // .pipe(changed('dist/img'))
        .pipe(gulp.dest('dist/img/'));
});


// BROWSER SYNC =========================================
gulp.task('browsersync', ['build'], function() {
    browsersync({
        server: { baseDir: 'dist' },
        port: 8000,
        files: [ 'dist/css/*.css']
    })
});


// WATCH ================================================
gulp.task('watch', ['browsersync'], function() {
    gulp.watch('src/**/*.html',             ['html']);
    gulp.watch('src/_scss/**/*.scss',       ['css']);
    gulp.watch('src/_js/**/*.js',           ['js']);
    gulp.watch('src/_img/**/*.+(png|jpg)',  ['images']);
    gulp.watch('src/_img/**/*.svg',         ['svg']);
});


// BUILD ================================================
gulp.task('build', [
    'html',
    'images',
    'svg',
    'css',
    'fonts',
    'js'
]);

gulp.task('default', function(callback) {
    runSequence(
        'clean',
        ['build'],
        'watch',
    callback);
});