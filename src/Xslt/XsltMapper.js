/* eslint-disable */
export interface Attributes {
  nodeName: string;
  nodeValue: string;
}
export interface ChildNodes {
  nodeName: string;
  nodeValue: string;
}
export interface Controlfield {
 tag: string;
 text: string;
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
