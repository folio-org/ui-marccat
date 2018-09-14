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

