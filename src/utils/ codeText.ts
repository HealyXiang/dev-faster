import { TsType } from '../constants';

const numberReg = /\d+/;

export function getTsTypeBysString(content: string): string {
  if (/".*"/.test(content) || /'.*'/.test(content)) {
    return TsType.string;
  }
  if (numberReg.test(content)) {
    return TsType.number;
  } 
  if (/.*/.test(content)) {
    return TsType.string;
  }
  return TsType.null;
}

export function removeKeyQuotes(keyStr: string): string {
  let reg = /(".+")|('.+')/g;
  if (keyStr.match(reg)) {
    return keyStr.replace(/'|"/g, '');
  }
  return keyStr;
}

/**
* convertToFEType
*
* @param item "test_ name": "Json",
* @return test_name: string
*/
export function convertToFEType(item: string): string {
  let reg = /^.+:.+$/;
  if (reg.test(item)) {
    let [key, value] = item.split(':');
    value = value.trim();
    const length = value.length;
    const hasComma = value[length - 1] === ',';
    if (hasComma) {
      value = value.slice(0, length -1 );
    }
    value = getTsTypeBysString(value);
    if (hasComma) {
      value += ';';
    }
    key = convertToCamelcase(removeKeyQuotes(key));
    return [key, value].join(': ');
  }
  return getTsTypeBysString(item);
}

export function convertToCamelcase(keyStr: string): string {
  let res = '';
  for (let i = 0; i < keyStr.length; i++) {
    if (i > 0 && keyStr.charAt(i-1) === '_') {
      res += keyStr.charAt(i).toUpperCase();
      continue;
    }
    if (keyStr.charAt(i) === '_') {
      continue;
    }
    res += keyStr.charAt(i);
  }
  return res;
}