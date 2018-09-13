
export interface KeyValue<K, V> {
   label: K;
   value: V;
}

export default class LogicalViews {
    views: Array<KeyValue<string, string>>
}

