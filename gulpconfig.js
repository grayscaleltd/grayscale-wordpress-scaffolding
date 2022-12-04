const project = 'grayscale'; // set project name as path
const src = './src';
const dist = './app/public';

export default {
  assets: {
    src: src + '/assets/**',
    dest: dist + '/wp-content/themes/' + project + '/assets',
    blocksSrc: src + '/blocks/**/*.+(gif|jpg|png|svg)',
    blocksDest: dist + '/wp-content/plugins/client-blocks/assets',
  },

  // http://www.browsersync.io/docs/options/
  browsersync: {
    files: [
      dist + '/wp-content/plugins/client-blocks/**',
      dist + '/wp-content/themes/' + project + '/**',
      '!**/*.map',
    ],
    logFileChanges: false,
    open: false,
    proxy: 'localhost:8888',
    reloadDelay: 2000,
  },

  scripts: {
    src: src + '/js/*.js',
    dest: dist + '/wp-content/themes/' + project,
    adminSrc: src + '/js/admin/*.js',
    adminDest: dist + '/wp-content/themes/' + project + '/admin',
    blocksSrc: src + '/blocks/**/!(*-admin).js',
    blocksAdminSrc: src + '/blocks/**/+(*-admin).js',
    blocksDest: dist + '/wp-content/plugins/client-blocks',
  },

  setup: {
    dep: {
      'WordPress': 'https://wordpress.org/latest.zip',
      'Multiconfig': 'https://github.com/studio24/wordpress-multi-env-config/archive/master.zip',
    },
    dest: dist,
  },

  styles: {
    includePaths: [
      'node_modules/normalize.css',
    ],
    src: src + '/scss/**/*.scss',
    dest: dist + '/wp-content/themes/' + project,
    adminSrc: src + '/scss/admin/*.scss',
    adminDest: dist + '/wp-content/themes/' + project + '/admin',
    blocksSrc: src + '/blocks/**/*.scss',
    blocksDest: dist + '/wp-content/plugins/client-blocks',
  },

  templates: {
    src: src + '/templates/**',
    dest: dist + '/wp-content/themes/' + project,
    blocksSrc: src + '/blocks/**/*.php',
    blocksDest: dist + '/wp-content/plugins/client-blocks',
  },

  utility: {
    clean: [
      '**/.DS_Store',
      '**/Thumbs.db',
      dist + '/**/*.map',
    ],
  },
};
