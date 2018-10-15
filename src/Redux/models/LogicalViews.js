import { Model } from './Model';

export interface KeyValue<K, V> {
   label: K;
   value: V;
}

export default class LogicalViews implements Model {
    views: Array<KeyValue<string, string>>

    constructor(views:Array<KeyValue<string, string>>) {
      this.views = views;
    }
}

export class SearchRecords {
  fields: Array<SearchRecordsFields> = [];
}

export class SearchRecordsFields {
  tag:string;
  ind1:string;
  ind2:string;
  subfields:Array<any>
}

