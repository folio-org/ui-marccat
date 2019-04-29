import { EMPTY_STRING } from '../../../shared/config/constants';

export class BaseFixedFields<K, V> {
    key: K;
    value: V;

    constructor(k: K, v: V): BaseFixedFields<K, V> {
      this.key = k;
      this.value = v;
    }
}

export class FixedFields<K, I1, I2, S> {
    code: K;
    ind1:I1;
    ind2:I2
    subfield:S[];

    constructor(k: K, i1?: I1, i2?: I2, s?:S[]): FixedFields<K, I1, I2, S> {
      this.code = k;
      this.ind1 = i1;
      this.ind2 = i2;
      this.subfield = s;
    }
}

export class VariableField {
    categoryCode: number = 0;
    code: string = EMPTY_STRING;
    displayValue: string = EMPTY_STRING;
    functionCode: string = EMPTY_STRING;
    headingTypeCode: number = 0;
    ind1: string = EMPTY_STRING;
    ind2: string = EMPTY_STRING;
    itemTypeCode: number = -1;
    sequenceNumber: number = 0;
    keyNumber: number = -1;
    skipInFiling: number = 0;
    subfields: Array<any> = [];
}

export type RecordTemplateType = "A" | "B";

export class RecordTemplate {
    id: string = EMPTY_STRING;
    name: string = EMPTY_STRING;
    type: RecordTemplateType;
    fields: Array<any>;
}

export class Record {
    id: string = EMPTY_STRING;
    verificationLevel: number = 1;
    fields: Array<any> = [];
}

export class RecordContainer {
    bibliographicRecord: Record;
    recordTemplate: RecordTemplate;
}

export type HeadingType = {
    defaultValue: string,
    dropdownSelect: Array<{
      label: string,
      value: string,
    }>,
    name: string,
}
