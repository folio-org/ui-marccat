export interface Label {
    label: string;
    value: string;
}

export type TemplateRecord = {
    fixedFields: Array<Object>;
    group: number;
    leader: Label;
    name: string;
    type: string;
    variableFields: Array<Object>
}
