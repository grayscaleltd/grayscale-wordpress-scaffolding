import config from '../gulpconfig.js';

import {checkbox, input} from '@inquirer/prompts';
import chalk from 'chalk';
import {deleteAsync} from 'del';
import download from 'download';
import fs from 'node:fs';
import gulp from 'gulp';
import gulpStringReplace from 'gulp-string-replace';
import nodeFetch from 'node-fetch';
import ora from 'ora';
import through from 'through2';

const gulpStringReplaceOption = {
  logs: {
    enabled: false,
  },
};

const project = {};

async function prepareSetup() {
  process.stdout.write(
      process.platform === 'win32' ?
        '\x1B[2J\x1B[0f' :
        '\x1B[2J\x1B[3J\x1B[H'
  );

  console.log(
      '\n',
      chalk.bgHex('#7c01fd').black(` Grayscale WordPress Scaffolder `),
      '\n',
  );

  project.name = await input({
    message: 'Project name (alphabets, hyphens, and spaces only):',
    required: true,
    validate: (value) => {
      if (/^[ ]/.test(value)) {
        return 'Project name cannot start with a space!';
      } else if (/[^A-Za-z -]/.test(value)) {
        return 'Alphabets, hyphens, and spaces only!';
      }

      return true;
    },
  });

  project.slug = await input({
    message: 'Project slug (alphabets and underscores only):',
    default: () => {
      return project.name.replace(/[^0-9|A-Z|a-z]/g, '_')
          .replace(/_+/g, '_')
          .toLowerCase();
    },
    required: true,
    validate: (value) => {
      if (/[^A-Za-z_]/.test(value)) {
        return 'Alphabets and underscores only!';
      }

      return true;
    },
  });

  project.url = await input({
    message: 'Project URL:',
    default: () => {
      return 'https://' + project.slug + '.com';
    },
    required: true,
    validate: (value) => {
      if (/[^A-Za-z:/\-.]/.test(value)) {
        return 'Alphabets, colon, forward slashes, and hyphens only!';
      }

      return true;
    },
  });

  project.dependencies = [];

  Object.keys(config.setup.dep).map((key) => {
    project.dependencies = [
      ...project.dependencies,
      {
        name: key,
        value: config.setup.dep[key],
      }
    ];
  });

  project.dependencies = await checkbox({
    message: `Should I download any of the following?`,
    choices: project.dependencies,
  });

  if (!project.dependencies.length) {
    console.log(chalk.cyan('No'));
  } else {
    const spinner = ora('Downloading...').start();

    await Promise.all(project.dependencies.map((url) => {
      return download(url, config.setup.dest, {
        extract: true,
        strip: 1,
      });
    })).then((resolved) => {
      spinner.succeed(`Downloaded ${resolved.length} item(s).`);
    }).catch((error) => {
      spinner.fail(`Download incomplete: ${error.name}.`);
    });
  }

  return gulp.src([
    './src/**',
    './gulpconfig.js',
    './package.json',
  ], {base: './'})
      .pipe(gulpStringReplace(
          /: Grayscale/g,
          `: ${project.name}`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /Theme tailor-made for Grayscale/g,
          `Theme tailor-made for ${project.name}`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /: grayscale/g,
          `: ${project.slug}`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /'grayscale'/g,
          `'${project.slug}'`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /grayscale-wordpress-scaffolding/g,
          `${project.slug}`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /"version": "(\d|\.)+"/g,
          `"version": "0.0.1"`,
          gulpStringReplaceOption
      ))
      .pipe(gulpStringReplace(
          /"homepage": "https:\/\/grayscale\.com\.hk"/g,
          `"homepage": "${project.url}"`,
          gulpStringReplaceOption
      ))
      .pipe(gulp.dest('./'));
}

function removeWPthemes() {
  return deleteAsync([
    config.setup.dest + '/wp-content/themes/**',
    '!' + config.setup.dest + '/wp-content/themes',
    '!' + config.setup.dest + '/wp-content/themes/index.php',
  ]);
}

function fetchWPsalt() {
  return nodeFetch('https://api.wordpress.org/secret-key/1.1/salt/')
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((salt) => {
        project.salt = salt.split('\n').filter((line) => (line)).join('\n');
      })
      .catch((error) => {
        console.error(chalk.red('fetchWPsalt Error: ' + error.message));
      });
}

function replaceWPsalt() {
  return gulp.src(config.setup.dest + '/wp-config*.php')
      .pipe(through.obj(function(file, enc, cb) {
        const oldWPconfig = file.contents.toString(enc).split(/\r\n|\r|\n/g);
        let newWPconfig = [];
        let isSaltReplaced = false;

        oldWPconfig.forEach((line) => {
          if (!line.match('put your unique phrase here')) {
            newWPconfig.push(line);
          } else if (!isSaltReplaced) {
            newWPconfig.push(project.salt);
            isSaltReplaced = true;
          }
        });

        newWPconfig = newWPconfig.join('\n');

        file.contents = Buffer.from(newWPconfig);
        cb(null, file);
      }))
      .pipe(gulp.dest(config.setup.dest));
}

function displayCompleteHint(cb) {
  fs.readdir(config.setup.dest + '/', (e, files) => {
    if (e) {
      console.log(chalk.red('Cannot read directory.'));
    } else {
      console.log(
          '\n',
          chalk.bgGreen.black(` WordPress is ready. Configure the files: `),
          '\n',
      );

      files.forEach((file) => {
        if (/wp-config[\S]+\.php/.test(file)) {
          console.log(chalk.green(` 👉 ${config.setup.dest}/${file}\r`));
        }
      });

      console.log('\r');
    }

    cb();
    process.exit();
  });
}

export default gulp.series(
    prepareSetup,
    removeWPthemes,
    fetchWPsalt,
    replaceWPsalt,
    displayCompleteHint,
);
