import { MARC } from '../Utils/';

export class Subfield {
  code: string;
  text: string;

  /**
   *
   * @param {*} code a code text of subfield
   * @param {*} text a text content of subfield
   */
  constructor(code: string, text) {
    this.code = code;
    this.text = text;
  }
}
export class Controlfield {
  tag: string;
  text: string;

  /**
   *
   * @param {*} tag a tag text of controlfield
   * @param {*} text a text content of controlfield
   */
  constructor(tag, text) {
    this.tag = tag;
    this.text = text;
  }
}
export class Datafield {
  ind1: string;
  ind2: string;
  tag: string;
  subField: Array<Subfield>;

  /**
   *
   * @param {*} ind1 a ind1 text of controlfield
   * @param {*} ind2 a ind2 text of controlfield
   * @param {*} tag a tag text of controlfield
   * @param {*} subField a subfield array
   */
  constructor(ind1: string, ind2: string, tag: string, subField?: Array<Subfield>) {
    this.ind1 = ind1;
    this.ind2 = ind2;
    this.tag = tag;
    if (subField) this.subField = subField;
  }

  /**
   *
   * @param {*} subField set subfield
   */
  bindSubfield(subField) {
    this.subField = subField;
  }
}
/**
 *
 */
export class XlstMapper {
    record: Array<Controlfield, Datafield> = [];

    /**
     *
     * @param {*} controlField a controlfield array
     * @param {*} datafield a datefield array
     */
    bind(controlField: Array<Controlfield> = [], datafield: Array<Datafield> = []) {
      this.record.push(controlField, datafield);
    }
}

/**
 *
 * @param {*} data a query result
 * @returns {*} mapper a
 */
export function bindXmlRsult(data) {
  let result;
  const controlFields = [];
  const dataFields = [];
  const mapper = new XlstMapper();
  data
    .filter(r => r.data !== null)
    .flatMap(d => result = (d.data))
    .map(() => {
      const doc = new DOMParser().parseFromString(result, 'application/xml');
      const nodeList: NodeList = doc.childNodes;
      const xml = Array.from(nodeList)[0];
      [...xml.childNodes].forEach((e) => {
        if (e.nodeName === MARC.CONTROL_FIELD) {
          controlFields.push(new Controlfield(e.attributes[0].textContent, e.textContent));
        } else if (e.childNodes.length > 0) {
          const subFields: Array<Subfield> = [];
          const currDatefield = new Datafield(
            e.attributes[0].textContent,
            e.attributes[1].textContent,
            e.attributes[2].textContent,
          );
          [...e.childNodes].forEach(i => {
            subFields.push(new Subfield(i.attributes[0].textContent, i.textContent));
          });
          currDatefield.bindSubfield(subFields);
          dataFields.push(currDatefield);
        } else {
          dataFields.push(new Datafield(e.attributes[0].textContent, e.attributes[1].textContent, e.attributes[2].textContent));
        }
      });
      return null;
    });
  mapper.record.push(controlFields, dataFields);
  return mapper;
}
