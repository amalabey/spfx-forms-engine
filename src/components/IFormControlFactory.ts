import IFieldData, { FieldValueType } from "../model/IFieldData";
import IItemData from "../model/IItemData";

export interface IFormElementMetadata {
    type: string;
    name: string;
    dataSource?: string;
    dataMember?: string;
    childControls?: any[];
    columns?: any[];
}

export interface IFormDatabindingMetadata {
    item: IItemData;
    fieldData: IFieldData;
    factory: IFormControlFactory;
    onFieldValueChanged: (item: IItemData, newFieldValue: IFieldData) => void;
}

export default interface IFormControlFactory {
    createControl(schema: any, index: number, onControlValueChanged: (item: IItemData, newFieldValue: IFieldData) => void);
    createControlWithData(schema: any, index: number, onControlValueChanged: (item: IItemData, newFieldValue: IFieldData) => void, 
        itemData: IItemData);
}