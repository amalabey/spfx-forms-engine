import * as React from "react";

import IFieldData, { FieldValueType } from "../model/IFieldData";
import IItemData from "../model/IItemData";
import IFormData from "../model/IFormData";
import { strEnum } from "../util";
import Row from "../components/fields/Row";
import Column from "../components/fields/Column";
import TextFormField from "../components/fields/TextFormField";
import DropDownField from "../components/fields/DropDownField";
import DateFormField from "../components/fields/DateFormField";
import IFormFieldFactory, {IFormElementMetadata} from "./IFormFieldFactory";
import { databoundFormControl } from "../components/FormControl";

export const FormFieldTypes = strEnum([
    'Row',
    'Column',
    'TextFormField',
    'DropDownField',
    'DateFormField'
]);

export type SupportedFieldType = keyof typeof FormFieldTypes;

export default class FormFieldFactory implements IFormFieldFactory {
    private dataSource: IFormData;

    constructor(formDataSource: IFormData) {
        this.dataSource = formDataSource;
    }

    public getFieldData(dataSource: string, dataMember: string, index: number): IFieldData {
        if(dataSource && dataMember){
            const items: IItemData[] = this.dataSource.lists[dataSource];
            if(items !== null && items.length > 0){
                const item: IItemData = items[index];
                if(item) {
                    return item.fields[dataMember];
                }
            }
        }

        return null;
    }

    public createControl(schema: any, index: number, onControlValueChanged: (newFieldValue: IFieldData) => void) {
        const metadata: IFormElementMetadata = schema as IFormElementMetadata;
        const dataBindingProps = {
            data: this.getFieldData(metadata.dataSource, metadata.dataMember, index), 
            factory: this, 
            onFieldValueChanged: (newFieldValue: IFieldData) => { 
                if(onControlValueChanged){
                    onControlValueChanged(newFieldValue);
                }
            }
        };

        switch(metadata.type){
            case FormFieldTypes.Row:
                const RowElement = databoundFormControl(Row);
                return <RowElement {...dataBindingProps} {...metadata } />;
        
            case FormFieldTypes.Column:
                const ColumnElement = databoundFormControl(Column);
                return <ColumnElement {...dataBindingProps} {...metadata } />;

            case FormFieldTypes.TextFormField:
                const TextFieldElement = databoundFormControl(TextFormField);
                return <TextFieldElement {...dataBindingProps} {...metadata } />;
            
            default:
                const DefaultElement = databoundFormControl(Column);
                return <DefaultElement {...dataBindingProps} {...metadata } />;

        }
    }
}