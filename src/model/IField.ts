export default interface IField {
    fieldDisplayName: string;
    fieldInternalName: string;
    fieldType: string;
    fieldValue: any;
    options: [{value: string, text: string}];
}