import config from './gulpconfig.js';

import gulp from 'gulp';

import assets from './tasks/assets.js';
import browsersync from './tasks/browsersync.js';
import {clean} from './tasks/utility.js';
import scripts, {scriptsDefault, scriptsAdmin} from './tasks/scripts.js';
import setup from './tasks/setup.js';
import styles from './tasks/styles.js';
import templates from './tasks/templates.js';

function configHasSrc(config, src) {
  return Object.prototype.hasOwnProperty.call(config, src);
}

export {
  assets,
  scripts,
  setup,
  styles,
  templates,
};

export const build = gulp.series(
    clean,
    gulp.parallel(assets, scripts, styles, templates),
);

export const watch = gulp.parallel(
    browsersync,
    function monitorFiles() {
      gulp.watch(
          [
            configHasSrc(config.assets, 'src') ?
                config.assets.src : [],
            configHasSrc(config.assets, 'blocksSrc') ?
                config.assets.blocksSrc : [],
          ],
          assets
      );
      scriptsDefault();
      gulp.watch(
          [
            configHasSrc(config.scripts, 'adminSrc') ?
                config.scripts.adminSrc : [],
          ],
          scriptsAdmin
      );
      gulp.watch(
          [
            configHasSrc(config.styles, 'src') ?
                config.styles.src : [],
            configHasSrc(config.styles, 'adminSrc') ?
                config.styles.adminSrc : [],
            configHasSrc(config.styles, 'blocksSrc') ?
                config.styles.blocksSrc : [],
          ],
          styles
      );
      gulp.watch(
          [
            configHasSrc(config.templates, 'src') ?
                config.templates.src : [],
            configHasSrc(config.templates, 'blocksSrc') ?
                config.templates.blocksSrc : [],
          ],
          templates
      );
    },
);

export default build;
