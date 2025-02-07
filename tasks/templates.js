import config from '../gulpconfig.js';
import packageJSON from '../package.json' with {type: 'json'};

import gulp from 'gulp';
import gulpStringReplace from 'gulp-string-replace';

const gulpStringReplaceOption = {
  logs: {
    enabled: false,
  },
};

function configHasSrc(config, src) {
  return Object.prototype.hasOwnProperty.call(config, src);
}

function templatesDefault(cb) {
  if (!configHasSrc(config.templates, 'src')) {
    return cb();
  }

  return gulp.src(config.templates.src)
      .pipe(gulp.dest(config.templates.dest));
}

function templatesBlock(cb) {
  if (!configHasSrc(config.templates, 'blocksSrc')) {
    return cb();
  }

  return gulp.src(config.templates.blocksSrc)
      .pipe(gulpStringReplace(
          /#{\$version}/g,
          packageJSON.version,
          gulpStringReplaceOption
      ))
      .pipe(gulp.dest(config.templates.blocksDest));
}

export default gulp.parallel(
    templatesDefault,
    templatesBlock,
);
