export enum FieldMode {
    NEW,
    EDIT,
    VIEW,
    LIST
}

export type FieldValueType = string | number | boolean | Date;

export default interface IFieldData {
    displayName: string;
    internalName: string;
    type: string;
    mode: FieldMode;
    value: FieldValueType;
    options?: [{key: string, text: string}];
}