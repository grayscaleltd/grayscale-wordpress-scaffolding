import config from '../gulpconfig.js';
import packageJSON from '../package.json' with {type: 'json'};

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpNotify from 'gulp-notify';
import gulpPlumber from 'gulp-plumber';
import gulpPostCSS from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import gulpSassVariables from 'gulp-sass-variables';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTouchCmd from 'gulp-touch-cmd';
import postcssCalc from 'postcss-calc';
import * as dartSass from 'sass-embedded';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

const args = yargs(hideBin(process.argv)).argv;
const postcssPlugins = [
  autoprefixer({
    grid: 'autoplace',
  }),
  cssnano({safe: true}),
  postcssCalc({
    precision: 2,
  }),
];
const sass = gulpSass(dartSass);

function stylesDefault() {
  return gulp.src(config.styles.src, {ignore: config.styles.adminSrc})
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(gulpSassVariables({
        $version: packageJSON.version,
      }))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.init()))
      .pipe(sass.sync({
        style: 'compressed',
      }))
      .pipe(gulpPostCSS(postcssPlugins))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.write('./')))
      .pipe(gulp.dest(config.styles.dest))
      .pipe(gulpIf((args.notify), gulpNotify({
        actions: 'Dismiss',
        message: 'CSS compilation done.',
        onLast: true,
        sound: 'Ping',
      })))
      .pipe(gulpTouchCmd());
}

function stylesAdmin() {
  return gulp.src(config.styles.adminSrc)
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(sass.sync({
        style: 'compressed',
      }))
      .pipe(gulpPostCSS(postcssPlugins))
      .pipe(gulp.dest(config.styles.adminDest))
      .pipe(gulpTouchCmd());
}

function stylesBlocks() {
  return gulp.src(config.styles.blocksSrc)
      .pipe(gulpPlumber({
        errorHandler: gulpNotify.onError('Error: <%= error.message %>'),
      }))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.init()))
      .pipe(sass.sync({
        style: 'compressed',
      }))
      .pipe(gulpPostCSS(postcssPlugins))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.write('./')))
      .pipe(gulp.dest(config.styles.blocksDest))
      .pipe(gulpTouchCmd());
}

export default gulp.parallel(
    stylesDefault,
    stylesAdmin,
    stylesBlocks,
);
