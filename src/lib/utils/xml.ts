import { xml2js } from 'xml-js';

export const xmlParse = (xml: string) => {
	return xml2js(xml, {
		trim: true,
		nativeType: true
	});
};
