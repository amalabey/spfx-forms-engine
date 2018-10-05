import IField from "../model/IField";
import { strEnum } from "../util";
import TextFormField from "../components/fields/TextFormField";
import DropDownField from "../components/fields/DropDownField";
import DateFormField from "../components/fields/DateFormField";

const FormFieldTypes = strEnum([
    'TextFormField',
    'DropDownField',
    'DateFormField'
]);

export type SupportedFieldType = keyof typeof FormFieldTypes;

export default class FormFieldFactory {
    public createFormField(type: SupportedFieldType, 
        field: IField, 
        onFieldValueChanged: (newFieldValue: IField) => void): JSX.Element {
        switch(type) {
            case FormFieldTypes.DropDownField:
                return new DropDownField({
                    css: string;
                    name: string;
                    dataSource?: string;
                    dataMember?: string;
                    required: boolean;
                    label?: string;
                    field: IField;
                });
        }
    }
}