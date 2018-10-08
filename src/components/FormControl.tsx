import * as React from "react";
import IFieldData from "../model/IFieldData";
import {IFormElementMetadata, IFormDatabindingMetadata} from "./IFormControlFactory";
import IItemData from "../model/IItemData";

export interface IFormControlProps extends IFormElementMetadata, IFormDatabindingMetadata {
}

export const databoundFormControl = <P extends object>(Control: React.ComponentType<P>) =>
    class FormControl extends React.Component<P & IFormControlProps> {
        public childControls: FormControl[];

        constructor(props){
            super(props);
            
            if(this.props.childControls && this.props.childControls.length > 0){
                this.childControls = this.props.childControls.map((childSchema) => {
                    return this.props.factory.createControl(childSchema, 0, this.onChildFieldValueChanged.bind(this));
                });
            }
        }

        public onChildFieldValueChanged(item: IItemData, newFieldValue: IFieldData): void {
            // Just chain the event to parent
            if(this.props.onFieldValueChanged){
                this.props.onFieldValueChanged(item, newFieldValue);
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
                item,
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

