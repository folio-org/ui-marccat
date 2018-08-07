/* eslint-disable */
export interface Attributes {
  nodeName: string;
  nodeValue: string;
}
export interface ChildNodes {
  nodeName: string;
  nodeValue: string;
}
export class Controlfield {
 tag: string;
 text: string;
 constructor(tag, text){
   this.tag = tag;
   this.text = text;
 }
}
export interface Subfield {
  code: string;
  text: string;
}
export interface Datafield {
  ind1: string;
  ind2: string;
  tag: string;
  subField: Array<Subfield>
}
export class XlstMapper {
    record: Array = [];
}

export function bindXmlRsult(results){
  const parser = new DOMParser();
  const doc = parser.parseFromString(results, 'application/xml');
  const nodeList:NodeList = doc.childNodes;
  const xml = Array.from(nodeList)[0];
  const controlFields = [];
  const dataFields = [];
  [...xml.childNodes].forEach((e) => {
    if (e.nodeName === 'controlfield') {
      controlFields.push(new Controlfield(e.attributes[0].textContent, e.textContent));
    } else {
      dataFields.push(new Controlfield(e.attributes[0].textContent, e.textContent));
    }
  });
}