import { GET_PARAMS } from '../utils';
import { ParamsModel } from './models';

const PRE_BASE64 = 'eyJ';
const POST_BASE64 = '=';
const POST_BASE64_2 = POST_BASE64+POST_BASE64;

export const DAY_PARAMS: ParamsModel = (data => {
  if (data) {
    let lastChar = parseInt(data.substring(data.length-1));
    const firstChar = parseInt(data.substring(0,1));

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


export function encData(data: ParamsModel): string {
  let text = btoa(JSON.stringify(data));

  if (text.endsWith(POST_BASE64_2)) {
    text = text.substring(0, text.length-2) + 2;
  } else if (text.endsWith(POST_BASE64)) {
    text = text.substring(0, text.length-1) + 1;
  } else {
    text = text + 0;
  }

  if (text.startsWith(PRE_BASE64)) {
    text = ((new Date().getTime() % 9)+1) + text.substring(3);
  } else {
    text = 0 + text;
  }

  return text;
}
