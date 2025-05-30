import config from '../gulpconfig.js';

import chalk from 'chalk';
import {globSync} from 'glob';
import gulp from 'gulp';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import webpack from 'webpack';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

const args = yargs(hideBin(process.argv)).argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function configHasSrc(config, src) {
  return Object.prototype.hasOwnProperty.call(config, src);
}

export function scriptsDefault(cb) {
  webpack({
    mode: (args.production || args.p) ? 'production' : 'development',
    devtool: (args.production || args.p) ? false : 'eval-source-map',
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      }],
    },
    context: path.resolve(__dirname, '../'),
    entry: () => {
      const entries = {};

      if (
        configHasSrc(config.scripts, 'src') &&
        globSync(config.scripts.src).length
      ) {
        entries[`${config.scripts.dest}/application`] =
            globSync(config.scripts.src, {dotRelative: true});
      }

      if (
        configHasSrc(config.scripts, 'blocksSrc') &&
        globSync(config.scripts.blocksSrc).length
      ) {
        entries[`${config.scripts.blocksDest}/client-blocks`] =
            globSync(config.scripts.blocksSrc, {dotRelative: true});
      }

      if (
        configHasSrc(config.scripts, 'blocksAdminSrc') &&
        globSync(config.scripts.blocksAdminSrc).length
      ) {
        entries[`${config.scripts.blocksDest}/client-blocks-editor`] =
            globSync(config.scripts.blocksAdminSrc, {dotRelative: true});
      }

      return entries;
    },
    output: (webpack.version > 'v5') ? {
      path: path.resolve(__dirname, '../'),
      filename: '[name].js',
      ecmaVersion: 5,
    } : {
      path: path.resolve(__dirname, '../'),
      filename: '[name].js',
    },
    watch: (process.argv.includes('watch')),
  }, (err, stats) => {
    const statOptions = {
      preset: 'minimal',
      builtAt: true,
      colors: true,
      modules: false,
      timings: true,
    };

    console.error(`[${chalk.blue('webpack')}]`);
    console.error(stats.toString(statOptions));

    if (cb) cb();
  });
}

export function scriptsAdmin() {
  return gulp.src(config.scripts.adminSrc)
      .pipe(gulp.dest(config.scripts.adminDest));
}

export default gulp.parallel(
    scriptsDefault,
    scriptsAdmin,
);
