const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const del = require('del');
const plugins = require('gulp-load-plugins')();

const BUILDDIR = './dist/';

gulp.task('manifest', function() {
  const content = "script(src='client.js')";
  const filename = 'manifest.pug';
  let stream = source(filename);
  stream.end(content);
  return stream.pipe(gulp.dest(BUILDDIR + 'views/'));
});

gulp.task('clean', function() {
  return del([BUILDDIR]);
});

gulp.task('copyStaticFiles', function() {
  return gulp
    .src(['./src/views/*.pug', './src/public/**'], { base: './src/' })
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('log', function() {
  return gulp
    .src(['./src/Log/**'], { base: './src/' })
    .pipe(plugins.babel())
    .pipe(plugins.uglify())
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('server', function() {
  return gulp
    .src(['./src/index.js'], { base: './src/' })
    .pipe(plugins.babel())
    .pipe(plugins.rename('main.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('client', function() {
  let b = browserify({
    entries: './src/client.js',
    debug: true, // Used for sourcemaps.
    extensions: ['.jsx']
  });
  return b
    .transform(babelify)
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.init({ loadMaps: true }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(BUILDDIR));
});

gulp.task('nodemon', function(done) {
  var stream = plugins.nodemon({
    script: './dist/main.js',
    ext: 'js jsx pug',
    ignore: ['dist/'],
    env: { NODE_ENV: 'development' },
    tasks: ['build'],
    done: done
  });

  stream
    .on('restart', function() {
      console.log('restarted!');
    })
    .on('crash', function() {
      console.error('Application has crashed!\n');
      stream.emit('quit');
    });
});

gulp.task('build', gulp.parallel('client', 'server', 'log'));

gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('copyStaticFiles', 'build', 'manifest'), 'nodemon')
);
