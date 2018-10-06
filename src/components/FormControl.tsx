import * as React from "react";
import IFieldData, { FieldValueType } from "../model/IFieldData";
import IFormFieldFactory, {IFormElementMetadata} from "../services/IFormFieldFactory";
import { ThemeSettingName } from "@uifabric/styling/lib";

export interface IFormControlProps extends IFormElementMetadata {
    data: IFieldData;
    factory: IFormFieldFactory;
    onFieldValueChanged(newFieldValue: IFieldData): void;
}

export const databoundFormControl = <P extends object>(Control: React.ComponentType<P>) =>
    class FormControl extends React.Component<P & IFormControlProps> {
        public children: FormControl[];

        constructor(props){
            super(props);

            if(this.props.controls && this.props.controls.length > 0){
                this.children = this.props.controls.map((childSchema) => {
                    return this.props.factory.createControl(childSchema, 0, this.onChildFieldValueChanged);
                });
            }
        }

        public onChildFieldValueChanged(newFieldValue: IFieldData): void {
            if(this.props.onFieldValueChanged){
                this.props.onFieldValueChanged(newFieldValue);
            }
        }

        public render(): JSX.Element {
            // Filter out schema data and leave only the control properties
            const { 
                type,
                name,
                dataSource,
                dataMember,
                controls,
                columns, 
                data, 
                factory,
                onFieldValueChanged, 
                ...props } = this.props as IFormControlProps;
            return (
                <Control {...props}>
                    {this.children}
                </Control>
            );
        }
    };

