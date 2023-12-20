import { getElementById } from '../lib/dom-utils';
import { exec } from '../utils';

import * as lines from './page-lines';
import * as results from './page-results';

const mod: any = exec({
  'resultats-linies': () => results
}) ?? lines;

mod.init();

getElementById('content')?.show();