export default interface IField {
    fieldDisplayName: string;
    fieldInternalName: string;
    fieldType: string;
    fieldValue: any;
    options: [{key: string, text: string}];
}