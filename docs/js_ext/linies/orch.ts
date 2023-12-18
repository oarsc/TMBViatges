import { getElementById } from '../dom-utils';
import * as lines from "./lines";
import * as linesFilter from "./lines-filter";

if (location.pathname.indexOf('linies.html') >= 0){
	lines.init();
} else if (location.pathname.indexOf('linies-filter.html') >= 0){
	linesFilter.init();
} 

getElementById('content')?.show();