
interface Leader {
    code: string;
    value: string;
}

// type FieldsType = {| "dssda" | "dsa"|}

interface Fields {
  code: string;
  mandatory: bool;
  fixedFields?: Object;
  variableField?: Object;
}

export default class Template {
    name: string;
    group: number;
    type: string;
    leader: Leader;
    fields: Array<Fields>
}
