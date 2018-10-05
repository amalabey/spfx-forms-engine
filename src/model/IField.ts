export enum FieldMode {
    NEW,
    EDIT,
    VIEW,
    LIST
}

export default interface IField {
    displayName: string;
    internalName: string;
    type: string;
    mode: FieldMode;
    value: any;
    options: [{key: string, text: string}];
}