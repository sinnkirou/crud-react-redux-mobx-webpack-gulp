const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const del = require('del');
const plugins = require('gulp-load-plugins')();

const BUILDDIR = './dist/';

function uglifyJsWhenNeeded(stream) {
  if (process.env.NODE_ENV === 'production') {
    return stream.pipe(plugins.uglify());
  }
  return stream;
}

function sourceMapWhenNeeded(stream) {
  if (process.env.NODE_ENV !== 'production') {
    return stream
      .pipe(plugins.sourcemaps.init({ loadMaps: true }))
      .pipe(plugins.sourcemaps.write('.'));
  }
  return stream;
}

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

gulp.task('compileLog', function() {
  let stream = gulp.src(['./src/Log/**'], { base: './src/' }).pipe(plugins.babel());
  stream = uglifyJsWhenNeeded(stream);
  stream = sourceMapWhenNeeded(stream);
  return stream.pipe(gulp.dest(BUILDDIR));
});

gulp.task('server', function() {
  let stream = gulp
    .src(['./src/index.js'], { base: './src/' })
    .pipe(plugins.babel())
    .pipe(plugins.rename('main.js'));
  stream = uglifyJsWhenNeeded(stream);
  stream = sourceMapWhenNeeded(stream);
  return stream.pipe(gulp.dest(BUILDDIR));
});

gulp.task('client', function() {
  let b = browserify({
    entries: './src/client.js',
    debug: process.env.NODE_ENV !== 'production', // Used for sourcemaps.
    extensions: ['.jsx']
  });
  let stream = b
    .transform(babelify)
    .bundle()
    .pipe(source('client.js'))
    .pipe(buffer());
  stream = uglifyJsWhenNeeded(stream);
  stream = sourceMapWhenNeeded(stream);
  return stream.pipe(gulp.dest(BUILDDIR));
});

gulp.task('nodemon', function(done) {
  var stream = plugins.nodemon({
    script: BUILDDIR + 'main.js',
    ext: 'js jsx pug',
    ignore: [BUILDDIR],
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

gulp.task('build', gulp.parallel('client', 'server', 'compileLog'));

gulp.task('set-dev-node-env', async function() {
  await (process.env.NODE_ENV = 'development');
});

gulp.task('set-prod-node-env', async function() {
  await (process.env.NODE_ENV = 'production');
});

gulp.task(
  'default',
  gulp.series(
    gulp.parallel('set-dev-node-env', 'clean'),
    gulp.parallel('copyStaticFiles', 'build', 'manifest'),
    'nodemon'
  )
);

gulp.task(
  'build_prod',
  gulp.series(
    gulp.parallel('set-prod-node-env', 'clean'),
    gulp.parallel('copyStaticFiles', 'build', 'manifest')
  )
);
