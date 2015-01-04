var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function(callback) {
    runSequence(
        'clean',
        [
            'jekyll',
            'sass',
        ],
    callback );
});