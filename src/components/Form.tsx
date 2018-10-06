import * as React from "react";
import { connect } from 'react-redux';

import IFormData from "../model/IFormData";
import IFieldData from "../model/IFieldData";
import IFormFieldFactory from "../services/IFormFieldFactory";
import UiFabricFormFieldFactory from "../services/UiFabricFormFieldFactory";

export interface IFormProps {
    schema: any; // Validated at runtime
    formName: string;
    dataSource: IFormData;
}

export interface IFormState {
}

const mapStateToProps = (formData: IFormData) => ({
    dataSource: formData
});

export class Form extends React.Component<IFormProps, IFormState> {
    private factory: IFormFieldFactory;
    public children: JSX.Element[];

    constructor(props){
        super(props);
        this.factory = new UiFabricFormFieldFactory(this.props.dataSource);

        const childrenSchema = this.props.schema[this.props.formName];

        if(childrenSchema.controls && childrenSchema.controls.length > 0){
            this.children = childrenSchema.controls.map((childSchema) => {
                return this.factory.createControl(childSchema, 0, this.onChildFieldValueChanged);
            });
        }
    }

    public onChildFieldValueChanged(newFieldValue: IFieldData): void {
        console.log("Field value changed");
    }

    public render(): JSX.Element {
        return (
            <div className={"ms-Grid" }>
                {this.children}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Form);
