import { xml2js, type ElementCompact } from 'xml-js';

import { isArray } from './array';
import { isObject } from './object';

const flattenAttributes = (data: ElementCompact): object => {
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
    return data.map((entry) => flattenAttributes(entry as ElementCompact));
  }
  return data;
};

export const xmlParse = (xml: string): Record<any, any> => {
  const parsed: ElementCompact = xml2js(xml, {
    trim: true,
    ignoreDeclaration: true,
    ignoreComment: true,
    compact: true,
    alwaysArray: true,

    // Merge Directory and Video together
    elementNameFn: (val) => {
      if (val === 'Directory' || val === 'Video') {
        return 'MediaEntity';
      }

      return val;
    }
  });

  return flattenAttributes(parsed);
};
