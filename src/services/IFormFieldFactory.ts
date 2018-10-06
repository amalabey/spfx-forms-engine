import IFieldData, { FieldValueType } from "../model/IFieldData";

export interface IFormElementMetadata {
    type: string;
    name?: string;
    dataSource?: string;
    dataMember?: string;
    controls?: any[];
    columns?: any[];
}

export default interface IFormFieldFactory {
    createControl(schema: any, index: number, onControlValueChanged: (newFieldValue: IFieldData) => void);
}