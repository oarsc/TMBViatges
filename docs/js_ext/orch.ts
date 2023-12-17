import { getElementById } from './dom-utils';

let mod;
if (location.pathname.indexOf('resultats.html') >= 0){
	mod = require('./logic.ts');

} else if (location.pathname.indexOf('excepcions.html') >= 0){
	mod = require('./exceptions.ts');

} else {
	mod = require('./initialization.ts');
}

if (mod.init? mod.init() : true) {
	mod.load();
}

getElementById('content')?.show();