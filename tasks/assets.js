import config from '../gulpconfig.js';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpSharpOptimizeImages from 'gulp-sharp-optimize-images';
import gulpRename from 'gulp-rename';

function configHasSrc(config, src) {
  return Object.prototype.hasOwnProperty.call(config, src);
}

function assetsDefault(cb) {
  if (!configHasSrc(config.assets, 'src')) {
    return cb();
  }

  return gulp.src(config.assets.src, {encoding: false})
      .pipe(gulpChanged(config.assets.dest))
      .pipe(gulpSharpOptimizeImages({
        jpg_to_jpg: {
          progressive: true,
          mozjpeg: true,
        },
        png_to_png: {
          progressive: true,
        },
      }))
      .pipe(gulp.dest(config.assets.dest));
}

function assetsBlock(cb) {
  if (!configHasSrc(config.assets, 'blocksSrc')) {
    return cb();
  }

  return gulp.src(config.assets.blocksSrc, {encoding: false})
      .pipe(gulpChanged(config.assets.dest))
      .pipe(gulpRename({dirname: ''}))
      .pipe(gulp.dest(config.assets.blocksDest));
}

export default gulp.parallel(
    assetsDefault,
    assetsBlock,
);
