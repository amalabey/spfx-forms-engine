import * as React from "react";
import IFieldData, { FieldValueType } from "../model/IFieldData";
import IFormFieldFactory, {IFormElementMetadata} from "../services/IFormFieldFactory";
import { ThemeSettingName } from "@uifabric/styling/lib";

export interface IFormControlProps extends IFormElementMetadata {
    fieldData: IFieldData;
    factory: IFormFieldFactory;
    onFieldValueChanged(newFieldValue: IFieldData): void;
}

export const databoundFormControl = <P extends object>(Control: React.ComponentType<P>) =>
    class FormControl extends React.Component<P & IFormControlProps> {
        public childControls: FormControl[];

        constructor(props){
            super(props);
            
            if(this.props.childControls && this.props.childControls.length > 0){
                this.childControls = this.props.childControls.map((childSchema) => {
                    return this.props.factory.createControl(childSchema, 0, this.onChildFieldValueChanged);
                });
            }
        }

        public onChildFieldValueChanged(newFieldValue: IFieldData): void {
            if(this.props.onFieldValueChanged){
                this.props.onFieldValueChanged(newFieldValue);
            }
        }

        private renderChildren() {
            if(this.props.children){
                return this.props.children;
            }else if(this.childControls && this.childControls.length > 0){
                return this.childControls;
            }else{
                return null;
            }
        }

        public render(): JSX.Element {
            // Filter out schema data and leave only the control properties
            const { 
                type,
                name,
                dataSource,
                dataMember,
                childControls,
                columns, 
                fieldData, 
                factory,
                onFieldValueChanged, 
                ...props } = this.props as IFormControlProps;
            return (
                <Control {...props} key={name}>
                    {this.renderChildren()}
                </Control>
            );
        }
    };

