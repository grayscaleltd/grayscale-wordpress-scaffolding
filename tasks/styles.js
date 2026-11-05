import config from '../gulpconfig.js';
import packageJSON from '../package.json' with {type: 'json'};

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import gulpPlumber from 'gulp-plumber';
import gulpPostCSS from 'gulp-postcss';
import gulpSass from 'gulp-sass';
import gulpSassVariables from 'gulp-sass-variables';
import gulpSourcemaps from 'gulp-sourcemaps';
import gulpTouchCmd from 'gulp-touch-cmd';
import {spawn} from 'node:child_process';

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

function configHasSrc(config, src) {
  return Object.prototype.hasOwnProperty.call(config, src);
}

function playErrorSound(error) {
  console.error(error.toString());

  if (process.platform === 'darwin') {
    const sound = spawn(
        '/usr/bin/afplay',
        ['/System/Library/Sounds/Frog.aiff'],
        {detached: true, stdio: 'ignore'},
    );

    sound.on('error', () => {});
    sound.unref();
  }

  this.emit('end');
}

function stylesDefault(cb) {
  if (!configHasSrc(config.styles, 'src')) {
    return cb();
  }

  return gulp.src(config.styles.src, {ignore: config.styles.adminSrc})
      .pipe(gulpPlumber({errorHandler: playErrorSound}))
      .pipe(gulpSassVariables({
        $version: packageJSON.version,
      }))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.init()))
      .pipe(gulpIf(
        !args.s,
        sass({
          style: 'compressed',
        }),
        sass({
          silenceDeprecations: [
            'global-builtin',
            'if-function',
            'import',
          ],
          style: 'compressed',
        })
      ))
      .pipe(gulpPostCSS(postcssPlugins))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.write('./')))
      .pipe(gulp.dest(config.styles.dest))
      .pipe(gulpTouchCmd());
}

function stylesAdmin(cb) {
  if (!configHasSrc(config.styles, 'adminSrc')) {
    return cb();
  }

  return gulp.src(config.styles.adminSrc)
      .pipe(gulpPlumber({errorHandler: playErrorSound}))
      .pipe(sass({
        style: 'compressed',
      }))
      .pipe(gulpPostCSS(postcssPlugins))
      .pipe(gulp.dest(config.styles.adminDest))
      .pipe(gulpTouchCmd());
}

function stylesBlocks(cb) {
  if (!configHasSrc(config.styles, 'blocksSrc')) {
    return cb();
  }

  return gulp.src(config.styles.blocksSrc)
      .pipe(gulpPlumber({errorHandler: playErrorSound}))
      .pipe(gulpIf(!(args.production || args.p), gulpSourcemaps.init()))
      .pipe(gulpIf(
        !args.s,
        sass({
          style: 'compressed',
        }),
        sass({
          silenceDeprecations: [
            'global-builtin',
            'if-function',
            'import',
          ],
          style: 'compressed',
        })
      ))
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
