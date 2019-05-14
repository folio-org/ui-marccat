// @flow
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
    ind1: I1;
    ind2: I2
    subfield: S[];

    constructor(k: K, i1?: I1, i2?: I2, s?: S[]): FixedFields<K, I1, I2, S> {
      this.code = k;
      this.ind1 = i1;
      this.ind2 = i2;
      this.subfield = s;
    }
}
