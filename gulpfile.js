var gulp = require('gulp');
var shell = require('gulp-shell');

var bitcoinAppFileName = 'bitcoin-app.js';

gulp.task('scripts', shell.task([
    './node_modules/browserify/bin/cmd.js source/'+ bitcoinAppFileName +' > build/' + bitcoinAppFileName
]));

gulp.task('watch', function(){
    gulp.watch('./source/**/*.js',['scripts']);
});

gulp.task('default', ['scripts', 'watch']);