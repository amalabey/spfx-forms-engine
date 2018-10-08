import * as React from "react";
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { TextField, ITextFieldProps } from 'office-ui-fabric-react/lib/components/TextField';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/components/DatePicker';

import IFieldData, { FieldValueType, FieldMode } from "../model/IFieldData";
import IItemData from "../model/IItemData";
import IFormData from "../model/IFormData";
import { strEnum } from "../util";
import Row from "./controls/Row";
import Column from "./controls/Column";
import IFormControlFactory, { IFormElementMetadata, IFormDatabindingMetadata } from "./IFormControlFactory";
import { databoundFormControl } from "./FormControl";
import DataGrid from "./controls/DataGrid";

export const FormFieldTypes = strEnum([
    'Row',
    'Column',
    'TextFormField',
    'DropDownField',
    'DateFormField',
    'DataGrid'
]);

export type SupportedFieldType = keyof typeof FormFieldTypes;

export default class OfficeFabricFormControlFactory implements IFormControlFactory {
    private dataSource: IFormData;

    constructor(formDataSource: IFormData) {
        this.dataSource = formDataSource;
    }

    public getFieldData(dataSource: string, dataMember: string, index: number): IFieldData {
        if (dataSource && dataMember && index >= 0) {
            const items: IItemData[] = this.dataSource.lists[dataSource];
            if (items !== null && items.length > 0) {
                const item: IItemData = items[index];
                if (item) {
                    return item.fields[dataMember];
                }
            }
        }

        return null;
    }

    public getItemData(dataSource: string, index: number): IItemData {
        if (dataSource && index >= 0) {
            const items: IItemData[] = this.dataSource.lists[dataSource];
            if (items !== null && items.length > 0) {
                return items[index];
            }
        }

        return null;
    }

    public getItems(dataSource: string): IItemData[] {
        if (dataSource) {
            return this.dataSource.lists[dataSource];
        }
        return null;
    }

    public createControl(schema: any, index: number, onControlValueChanged: (item: IItemData, newFieldValue: IFieldData) => void) {
        const metadata: IFormElementMetadata = schema as IFormElementMetadata;
        const dataBindingProps: IFormDatabindingMetadata = {
            item: this.getItemData(metadata.dataSource, index),
            fieldData: this.getFieldData(metadata.dataSource, metadata.dataMember, index),
            factory: this,
            onFieldValueChanged: (row: IItemData, newFieldValue: IFieldData) => {
                if (onControlValueChanged) {
                    onControlValueChanged(row, newFieldValue);
                }
            }
        };

        return this.getControl(schema, index, onControlValueChanged, dataBindingProps);
    }

    public createControlWithData(schema: any, index: number, onControlValueChanged: (item: IItemData, newFieldValue: IFieldData) => void,
        itemData: IItemData) {
        const metadata: IFormElementMetadata = schema as IFormElementMetadata;
        const dataBindingProps: IFormDatabindingMetadata = {
            item: itemData,
            fieldData: metadata.dataMember ? itemData.fields[metadata.dataMember] : null,
            factory: this,
            onFieldValueChanged: (row: IItemData, newFieldValue: IFieldData) => {
                if (onControlValueChanged) {
                    onControlValueChanged(row, newFieldValue);
                }
            }
        };

        return this.getControl(schema, index, onControlValueChanged, dataBindingProps);
    }

    private getControl(schema: any, index: number,
        onControlValueChanged: (item: IItemData, newFieldValue: IFieldData) => void,
        dataBindingProps: IFormDatabindingMetadata) {
        const metadata: IFormElementMetadata = schema as IFormElementMetadata;
        switch (metadata.type) {
            case FormFieldTypes.Row:
                const RowElement = databoundFormControl(Row);
                return <RowElement {...dataBindingProps} {...metadata} />;

            case FormFieldTypes.Column:
                const ColumnElement = databoundFormControl(Column);
                return <ColumnElement {...dataBindingProps} {...metadata} />;

            case FormFieldTypes.TextFormField:
                const TextFieldElement = databoundFormControl(TextField);
                return <TextFieldElement
                    {...dataBindingProps}
                    {...metadata}
                    onChanged={(newValue: string) => {
                        if (onControlValueChanged) {
                            let fieldData = dataBindingProps.fieldData || {
                                displayName: metadata.dataMember,
                                internalName: metadata.dataMember,
                                type: "Text",
                                mode: FieldMode.NEW,
                                value: newValue
                            };
                            fieldData.value = newValue;
                            onControlValueChanged(dataBindingProps.item,fieldData);
                        }
                    }}
                />;

            case FormFieldTypes.DropDownField:
                const DropdownFieldElement = databoundFormControl(Dropdown);
                return <DropdownFieldElement {...dataBindingProps} {...metadata} />;

            case FormFieldTypes.DateFormField:
                const DateFieldElement = databoundFormControl(DatePicker);
                return <DateFieldElement {...dataBindingProps} {...metadata} firstDayOfWeek={DayOfWeek.Sunday} />;
            
            case FormFieldTypes.DataGrid:
                const items: IItemData[] = this.getItems(metadata.dataSource);
                return <DataGrid name={metadata.name} 
                    key={metadata.name}
                    dataSource={metadata.dataSource}
                    columnSchema={metadata.columns}
                    items={items?items:[]}
                    newAction={schema.newAction}
                    editAction={schema.editAction}
                    deleteAction={schema.deleteAction}
                    factory={this}
                    onFieldValueChanged={(item: IItemData, newFieldValue: IFieldData) => {
                        if (onControlValueChanged) {
                            onControlValueChanged(dataBindingProps.item, newFieldValue);
                        }
                    }}
                    />;

            default:
                const ErrorLabel = databoundFormControl(Label);
                return <ErrorLabel {...dataBindingProps} {...metadata}>Unsupported form field type</ErrorLabel>;
        }
    }

}