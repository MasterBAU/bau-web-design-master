var beep        = require('beepbeep'),
    colors      = require('colors'),
    browsersync  = require('browser-sync');

var src                 = 'src'
    dist                = 'dist',
    development         = 'dist/development';
    production          = 'dist/production';
    srcAssets           = 'src/_assets',
    developmentAssets   = 'dist/assets',
    productionAssets    = 'dist/production/assets';


// var src               = 'app';
// var build             = 'build';
// var development       = 'build/development';
// var production        = 'build/production';
// var srcAssets         = 'app/_assets';
// var developmentAssets = 'build/assets';
// var productionAssets  = 'build/production/assets';

// ERROR HANDLER ========================================
var onError = function(err) {
  beep([200, 200]);
  console.log(
    '\n*****************'.bold.gray + ' \\(°□°)/ '.bold.red + '<( ERROR! ) '.bold.blue + '*****************\n\n'.bold.gray +
    String(err) +
    '\n*******************************************************\n'.bold.gray );
  browsersync.notify('<span style="color:red">' + err + '</span>', 5000);
  this.emit('end');
};


module.exports = {

    browsersync: {
        development: {
            server: {
                baseDir: [ dist ]
            },
            port: 8000,
            files: [
                developmentAssets + '/css/*.css',
            ]
        }
    },

    clean: {
        src: [developmentAssets]
    },

    plumber: {
        errorHandler: onError
    },

    sass: {
        src:  srcAssets + '/scss/**/*.scss',
        dest: developmentAssets + '/css'
    },

    jekyll: {
        source: src,
        destination: development,
        config: '_config.yml',
        bundleExec: true
    },

    watch: {
        sass:    srcAssets + '/scss/**/*.scss',
    },

};