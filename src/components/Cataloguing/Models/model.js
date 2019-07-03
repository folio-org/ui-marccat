//
export class BaseFixedFields {

  constructor(k, v) {
    this.key = k;
    this.value = v;
  }
}

export class FixedFields {

  constructor(k, i1, i2, s) {
    this.code = k;
    this.ind1 = i1;
    this.ind2 = i2;
    this.subfield = s;
  }
}
