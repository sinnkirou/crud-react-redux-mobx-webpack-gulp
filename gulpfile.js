var gulp = require('gulp');
var browserify = require('browserify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('browserify', () => {
  var b = browserify({
    entries: './src/client.js',
    debug: true /*告知browserify在运行同时生成内联sourcemap用于调试*/
  });

  return b
    .transform('babelify', { presets: ['@babel/preset-env', '@babel/preset-react'] })
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', gulp.parallel('browserify'));
