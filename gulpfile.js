var fileinclude = require('gulp-file-include');
var dest = require('gulp-dest');
var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var pump = require('pump');
var jsmin = require('gulp-jsmin');
var sass = require('gulp-sass');
var less = require('gulp-less');
var path = require('path');
var webserver = require('gulp-webserver');
var gulpif = require('gulp-if');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var useref = require('gulp-useref');
var build = false;
var jadeInheritance = require('gulp-jade-inheritance');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var cached = require('gulp-cached');

gulp.task('jade', function() {
    return gulp.src('app/templates/**/*.jade')
        .pipe(changed('app/templates', { extension: '.html' }))
        .pipe(gulpif(global.isWatching, cached('jade')))
        .pipe(jadeInheritance({ basedir: 'app/templates', skip: 'node_modules' }))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('app/templates'));
});

gulp.task('copy-html', ['delete-html', 'pre-css', 'pre-js'], function() {
    return gulp.src(['./app/templates/pages/*.html'])
        .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
        .pipe(useref({ searchPath: build ? '.tmp/build': '.tmp/debug' }))
        .pipe(gulp.dest(build ? './dist/build' : './dist/debug'))
});

gulp.task('pre-css', function() {
    return gulp.src(['./app/styles/*.*'])
        .pipe(gulpif('*.less', less({ paths: [path.join(__dirname, 'less', 'includes')] })))
        .pipe(gulpif('*.scss', sass().on('error', sass.logError)))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest('.tmp/debug/styles'))
        .pipe(gulpif(build, minifyCSS()))
        .pipe(gulp.dest('.tmp/build/styles'));
});

gulp.task('resources', function() {
    return gulp.src(['./app/resources/**'])
        .pipe(gulpif(['*.jpg', '*.gif', '*.png', '*.svg'], imagemin()))
        .pipe(gulp.dest(build ? './dist/build/resources' : './dist/debug/resources'))
});

gulp.task('pre-js', function() {
    return gulp.src(['./app/scripts/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(eslint({
            "extends": ["eslint:recommended"],
            "env": {
                "node": true,
                "browser": true,
                "es6": true,
                "jquery": true
            },
            "rules": {
                "quotes": [2, "single"],
                "indent": [2, 2]
            }
        }))
        .pipe(eslint.formatEach('compact', process.stderr))
        .pipe(gulp.dest('.tmp/debug/scripts'))
        .pipe(gulpif(build, jsmin()))
        .pipe(gulp.dest('.tmp/build/scripts'));
});

gulp.task('webserver', ['render'], function() {
    gulp.src('./dist/debug')
        .pipe(webserver({
            livereload: true,
            port: 3001,
            directoryListing: './dist/debug',
            open: 'http://localhost:3001/index.html'
        }));
});

gulp.task('delete-html', function() {
    gulp.src(['./dist/**/*.html'])
        .pipe(clean({ force: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('./app/**/*.*', ['render']);
});

gulp.task('set-build', function() {
    build = true;
});

gulp.task('clear', ['copy-html'], function() {
    return gulp.src(['./.tmp']).pipe(clean())
});

gulp.task('copy', ['resources'], function(){
    return gulp.src(['app/*.*', '!app/*.html']).pipe(gulp.dest(build ? './dist/build' : './dist/debug'))
});

gulp.task('release', ['debug', 'build']);

gulp.task('debug', ['render']);

gulp.task('build', ['set-build', 'render']);

gulp.task('serve', ['render', 'watch', 'webserver']);

gulp.task('html', ['delete-html', 'pre-css', 'pre-js', 'jade', 'copy-html', 'clear']);

gulp.task('default', ['serve']);

gulp.task('render', ['resources', 'copy' ,'html']);

