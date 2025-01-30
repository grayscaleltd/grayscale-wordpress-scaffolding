import config from '../gulpconfig.js';

import gulp from 'gulp';
import gulpStringReplace from 'gulp-string-replace';
import fs from 'node:fs/promises';

const gulpStringReplaceOption = {
  logs: {
    enabled: false,
  },
};
const packageJSON = JSON.parse(await fs.readFile('package.json'));

function templatesDefault() {
  return gulp.src(config.templates.src)
      .pipe(gulp.dest(config.templates.dest));
}

function templatesBlock() {
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
