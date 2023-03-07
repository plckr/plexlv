import { xml2js } from 'xml-js';
import { isArray } from './array';
import { isObject } from './object';

const flattenAttributes = (data: any): any => {
  if (isObject(data)) {
    for (const key in data) {
      if (key === '_attributes') {
        continue;
      }
      data[key] = flattenAttributes(data[key]);
    }
    if ('_attributes' in data) {
      const { _attributes, ...rest } = data;
      if (isObject(_attributes)) {
        const newData = { ..._attributes, ...rest };

        return flattenAttributes(newData);
      }
    }
  }
  if (isArray(data)) {
    return data.map((entry) => flattenAttributes(entry));
  }
  return data;
};

export const xmlParse = (xml: string) => {
  const parsed = xml2js(xml, {
    trim: true,
    ignoreDeclaration: true,
    ignoreComment: true,
    compact: true,
    alwaysArray: true
  });

  return flattenAttributes(parsed);
};
