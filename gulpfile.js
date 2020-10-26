const gulp = require('gulp');
const sassCompile = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const terserJS = require('gulp-terser');
const concatJS = require('gulp-concat');
const babelJS = require('gulp-babel');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const vFtp = require("vinyl-ftp");

const jsSrcFolder = 'src/assets/js';
const cssSrcFolder = 'src/assets/css';
const scssSrcFolder = 'src/assets/scss';
const distFolder = 'dist';

// SCSS transpile & minify
function gulpScssMinify() {
  return gulp
    .src(scssSrcFolder + '/style.scss')
    .pipe(sassCompile().on('error', sassCompile.logError))
    .pipe(cleanCSS({ debug: true }, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(cssSrcFolder))
}

// JS minify
function minifyAndConcatJS() {
  return gulp
    .src([jsSrcFolder + '/!(*.min)*.js'])
    .pipe(concatJS('main.js'))
    .pipe(babelJS({
			presets: ['@babel/preset-env']
		}))
    .pipe(terserJS())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(jsSrcFolder))
}

// watch for js and css modify
function gulpWatch() {
  browserSync.init({
    server: {
      baseDir: "./src",
      index: "/index.html"
    }
  });
  gulp.watch(scssSrcFolder + '/**/*.scss', gulpScssMinify);
  gulp.watch([jsSrcFolder + '/!(*.min)*.js'], minifyAndConcatJS);
  gulp.watch('src/**/*.*').on('change', browserSync.reload);
}

function cleanDist() {
  return gulp.src(distFolder + '/**/', {read: false})
  .pipe(clean());
}

function moveToDist() {
  return gulp.src(['src/**/*.*','!src/assets/scss/**/*.*','!src/assets/js/main.js'])
    .pipe(gulp.dest(distFolder + '/'))
}

function deployFtp() {
  var conn = vFtp.create({
    host: "",
    user: "",
    pass: "",
    parallel: 10
  });
  return gulp.src([distFolder + "/**/*.*"],{base: distFolder,buffer: false})
    .pipe(conn.newer("/__TEMP/"))
    .pipe(conn.dest("/__TEMP/"));
};

// Run tasks
exports.default = gulp.series(gulpScssMinify, minifyAndConcatJS, gulpWatch);
exports.build = gulp.series(gulpScssMinify, minifyAndConcatJS, moveToDist);
exports.clean = cleanDist;
exports.deploy = gulp.series(gulpScssMinify, minifyAndConcatJS, moveToDist, deployFtp);
