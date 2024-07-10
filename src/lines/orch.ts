import { getElementById } from '../lib/dom-utils';
import { exec } from '../utils';

import * as lines from './page-lines';
import * as results from './page-results';
import * as obres from './page-obres';

const mod: any = exec({
  'resultats-linies': () => results,
  'obres': () => obres,
}) ?? lines;

mod.init();

getElementById('content')?.show();