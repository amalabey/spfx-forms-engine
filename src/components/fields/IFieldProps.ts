import { IFormElementProps } from "./IFormElementProps";
import IField from "../../model/IField";

export interface IFieldProps extends IFormElementProps {
    css?: string;
    name: string;
    dataSource?: string;
    dataMember?: string;
    required: boolean;
    label?: string;
    field: IField;
    onFieldValueChanged?(newFieldValue: IField): void;
}