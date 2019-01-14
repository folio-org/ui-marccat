export type Props = {
  translate: (o: Object) => string;
  children: any;
  store: Object;
  stripes: Object;
};

export type VariableField = {
  categoryCode: number;
  code: string;
  description: string;
  displayValue: string;
  functionCode: string;
  headingTypeCode: string;
  ind1: string;
  ind2: string;
  itemTypeCode: string;
  sequenceNumber: number;
  skipInFiling: number;
  subfields: Array;
};

export type LockType = 'R' | 'H' | 'C';
export type LockEntityType<K = LockType> = {
  type: K;
};
