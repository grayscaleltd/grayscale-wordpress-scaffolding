import config from '../gulpconfig.js';

import gulp from 'gulp';
import gulpChanged from 'gulp-changed';
import gulpSharpOptimizeImages from 'gulp-sharp-optimize-images';
import gulpRename from 'gulp-rename';

function assetsDefault() {
  return gulp.src(config.assets.src)
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

function assetsBlock() {
  return gulp.src(config.assets.blocksSrc)
      .pipe(gulpChanged(config.assets.dest))
      .pipe(gulpRename({dirname: ''}))
      .pipe(gulp.dest(config.assets.blocksDest));
}

export default gulp.parallel(
    assetsDefault,
    assetsBlock,
);
