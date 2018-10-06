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
                return new (databoundFormControl(Row))({...dataBindingProps, ...metadata});

            case FormFieldTypes.Column:
                return new (databoundFormControl(Column))({...dataBindingProps, ...metadata});

            case FormFieldTypes.TextFormField:
                return new (databoundFormControl(TextFormField))({...dataBindingProps, ...metadata});

            default:
                return new (databoundFormControl(Column))({...dataBindingProps, ...metadata});

        }
    }
}