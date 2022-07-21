import config from '../gulpconfig.js';

import {deleteAsync} from 'del';

function clean() {
  return deleteAsync(config.utility.clean);
}

export {clean};
