import config from '../gulpconfig.js';

import chalk from 'chalk';
import {fileURLToPath} from 'node:url';
import {globSync} from 'glob';
import gulp from 'gulp';
import path from 'node:path';
import webpack from 'webpack';
import yargs from 'yargs';

const args = yargs(process.argv.slice(2)).argv;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function scriptsDefault(cb) {
  webpack({
    mode: (args.production) ? 'production' : 'development',
    devtool: (args.production) ? false : 'eval-source-map',
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
      }],
    },
    context: path.resolve(__dirname, '../'),
    entry: () => {
      const entries = {};

      if (globSync(config.scripts.src).length) {
        entries[`${config.scripts.dest}/application`] =
            globSync(config.scripts.src, {dotRelative: true});
      }

      if (globSync(config.scripts.blocksSrc).length) {
        entries[`${config.scripts.blocksDest}/client-blocks`] =
            globSync(config.scripts.blocksSrc, {dotRelative: true});
      }

      if (globSync(config.scripts.blocksAdminSrc).length) {
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

    if (!!cb) cb();
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
