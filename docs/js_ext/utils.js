const PRE_BASE64 = 'eyJ';
const POST_BASE64 = '=';
const POST_BASE64_2 = POST_BASE64+POST_BASE64;

const GET_PARAMS = (function(search){
	let params = {};
	if (search.length > 0) {
		params = search.substr(1).split('&')
			.reduce((params,p)=>{
				let [k,v] = p.split('=');

				if (v) {
					v = decodeURIComponent(v);
				}

				params[k] = v;
				return params;
			},{});
	}

	return params;
})(location.search);

export const PARAMS = (function(data){
	if (data) {
		let lastChar = parseInt(data.substr(data.length-1));
		let firstChar = parseInt(data.substr(0,1));

		data = data.substr(1, data.length-2);

		while (lastChar --> 0) {
			data += POST_BASE64;
		}

		if (firstChar) {
			data = PRE_BASE64 + data;
		}

		return JSON.parse(atob(data));
	} else {
		return {};
	}

})(GET_PARAMS.d);

export const MES_NOMS = ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'];


export function fromDate(date, short) {
	let month = date.getMonth()+1;
	let day = date.getDate();
	if (month < 10) month = '0'+month;
	if (day < 10) day = '0'+day;
	if (short) {
		return `${date.getFullYear()%2000}${month}${day}`;
	} else {
		return `${date.getFullYear()}-${month}-${day}`;
	}
}

export function toDate(value) {
	let str = ''+value;
	if (str.length != 10 && str.length != 6) return undefined;

	if (str.length == 6) {
		return new Date(`20${str.substr(0,2)}-${str.substr(2,2)}-${str.substr(4)}`);
	} else {
		return new Date(`${str.substr(0,4)}-${str.substr(5,2)}-${str.substr(8)}`);
	}
}

export function diffDays(i,f) {
	if (!(i instanceof Date)) i = new Date(i);
	if (!(f instanceof Date)) f = new Date(f);

	let diffTime = Math.abs(f.getTime() - i.getTime());
	let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
	return diffDays;
}

export function formatPrice(val, symbol) {
	let str = `${val}`;
	let dot = str.indexOf('.');

	if (dot >= 0) {
		while(str.length-dot < 3) {
			str += '0';
		}
	}
	if (symbol) {
		return str+' '+symbol;
	} else {
		
return str;
	}
}

export function encData(data) {
	let text = btoa(JSON.stringify(data));

	if (text.endsWith(POST_BASE64_2)) {
		text = text.substr(0, text.length-2) + 2;
	} else if (text.endsWith(POST_BASE64)) {
		text = text.substr(0, text.length-1) + 1;
	} else {
		text = text + 0;
	}

	if (text.startsWith(PRE_BASE64)) {
		text = ((new Date().getTime() % 9)+1) + text.substr(3);
	} else {
		text = 0 + text;
	}

	return text;
}

export function goToPage(page, d = GET_PARAMS.d) {
	location.href = (page? `./${page}.html` : './' ) + '?d='+d;
}