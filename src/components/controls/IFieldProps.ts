import { IFormElementProps } from "./IFormElementProps";
import IFieldData from "../../model/IFieldData";

export interface IFieldProps extends IFormElementProps {
    css?: string;
    name?: string;
    dataSource?: string;
    dataMember?: string;
    required?: boolean;
    label?: string;
    onFieldValueChanged?(newFieldValue: IFieldData): void;
}