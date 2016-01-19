var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var noop = plugins.util.noop;
var fs = require('fs');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var lazypipe = require('lazypipe');
var del = require('del');

var historyApiFallback = require('connect-history-api-fallback');

var isWatching = false;

var paths = {
  scripts: ['js/components/**/*.jsx', 'js/**/*.js'],
  scss: 'assets/stylesheets/**/*.scss',
  images: 'assets/images/**/*',
  fonts : 'assets/fonts/*'
};

var settings = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('clean-scripts', function() {
  return del(['build/app.js']);
});

gulp.task('clean-images', function() {
  return del(['build/img']);
});

gulp.task('clean-css', function() {
  return del(['build/css']);
});

gulp.task('clean-fonts', function() {
  return del(['build/fonts']);
});

gulp.task('scripts', ['clean-scripts'], function () {
  return browserify({entries: 'js/components/app.jsx', extensions: ['.jsx'], debug: true})
    .transform('babelify', {
      presets: ['es2015', 'stage-1', 'react'],
      plugins: ['transform-decorators-legacy']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(plugins.uglify())
    .pipe(plugins.size())
    .pipe(gulp.dest('build'))
    .pipe(plugins.livereload());
});

// Copy all static images
gulp.task('images', ['clean-images'], function() {
  return gulp.src(paths.images)
    .pipe(plugins.imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'))
    .pipe(plugins.livereload());
});

gulp.task('sass', ['clean-css'], function () {
  gulp.src(paths.scss)
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest('build/css'))
    .pipe(plugins.livereload());
});

gulp.task('fonts', ['clean-fonts'], function () {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'))
    .pipe(plugins.livereload());
});

gulp.task('index', ['clean', 'scripts', 'images', 'sass', 'fonts'], function(){
  var target = gulp.src('index.html');
  var sources = gulp.src(['build/app.js', 'build/css/**/*.css'], {read: false});
   
  return target.pipe(plugins.inject(sources, {ignorePath: 'build'}))
    .pipe(gulp.dest('build'));
});

// Rerun the task when a file changes
gulp.task('watch', ['statics'], function() {
  plugins.livereload.listen({ basePath: 'build' });

  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.scss, ['sass']);
});

gulp.task('statics', plugins.serve({
  port: settings.frontend.ports.development,
  root: ['build'],
  middleware: historyApiFallback({})
}));

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['index', 'watch']);

