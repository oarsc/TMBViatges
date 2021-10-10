import { getElementById } from './dom-utils';

let mod;
if (location.pathname.indexOf('resultats.html') >= 0){
	mod = require('./logic.js');

} else if (location.pathname.indexOf('excepcions.html') >= 0){
	mod = require('./exceptions.js');

} else {
	mod = require('./initialization.js');
}

let res = mod.init? mod.init() : undefined;
if (res === undefined || res)
	mod.load();

getElementById('content').show();