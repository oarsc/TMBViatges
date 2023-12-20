import { getElementById } from '../lib/dom-utils';
import { exec } from '../utils';

import * as home from './page-home';
import * as results from './page-results';
import * as exceptions from './page-exceptions';

const mod: any = exec({
  'resultats': () => results,
  'excepcions': () => exceptions,
}) ?? home;

if (mod.init? mod.init() : true) {
  mod.load();
}

getElementById('content')?.show();