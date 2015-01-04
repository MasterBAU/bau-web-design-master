'use strict';

// INIT GULP ============================================
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var beep        = require('beepbeep'),
    colors      = require('colors'),
    del         = require('del'),
    browserSync = require('browser-sync');


// ERROR HANDLER ========================================
var onError = function(err) {
  beep([200, 200]);
  console.log(
    '\n*****************'.bold.gray + ' \\(°□°)/ '.bold.red + '<( ERROR! ) '.bold.blue + '*****************\n\n'.bold.gray +
    String(err) +
    '\n*******************************************************\n'.bold.gray );
  this.emit('end');
};


// CLEAN ================================================
gulp.task('clean_all', function() {
    del(['.tmp/**/*.*', 'dist/**/*.*'], function(err, deletedFiles) {
        console.log('Files deleted:\n'.bold.green , deletedFiles.join(',\n '));
    });
});


// HTML ==================================================
gulp.task('jekyll', function() {
    gulp.src('src/**/*.html')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.jekyll({
            source: 'src',
            destination: '.tmp/jekyll',
            config: '_config.yml',
            bundleExec: true
        }));
});
gulp.task('html', ['jekyll'], function() {
    gulp.src('.tmp/jekyll/**/**.*')
        .pipe(gulp.dest('dist'));
});
gulp.task('default', ['html']);

// STYLES ===============================================
gulp.task('css', function() {
    gulp.src('src/_assets/scss/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['> 1%', 'last 2 versions']
        }))
        // .pipe($.csso())
        // .pipe($.rename({
            // suffix: '.min'
        // }))
        .pipe(gulp.dest('dist/reveal/css'));
});


// BROWSER SYNC =========================================
gulp.task('browser-sync', ['html'], function() {
    browser_sync =  browserSync({
        notify: false,
        server: ['dist'],
        port: 8000,
        index: 'index.html',
        open: 'external'
    });
});


// WATCH ================================================
gulp.task('watch', ['html', 'css'], function() {
    gulp.watch('src/_assets/scss/*.scss', ['css', browserSync.reload]);
    gulp.watch('src/*.html', ['html', browserSync.reload]);
});


// BUILD TASKS ==========================================
gulp.task('process',
    [
        'html',
        'css'
    ]
    // function () {
    //     return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
    // }
);
gulp.task('build', ['clean_all'], function() {
    gulp.start('process');
});

gulp.task('default', ['clean_all'], function () {
    gulp.start('browser-sync')
});