import * as React from "react";
import { Dispatch } from "redux";
import { connect } from 'react-redux';

import IFormData from "../model/IFormData";
import IFieldData from "../model/IFieldData";
import IFormFieldFactory from "../services/IFormFieldFactory";
import UiFabricFormFieldFactory from "../services/UiFabricFormFieldFactory";
import { IState } from "../store/IState";
import { changeFieldValue } from "../actions/Actions";

export interface IFormProps {
    schema: any; // Validated at runtime
    formName: string;
    dataSource: IFormData;
    dispatch: Dispatch;
}

export interface IFormState {
}

const mapStateToProps = (state: IState) => {
    console.log(state);
    return {
        dataSource: state.dataSource,
        formName: state.formName,
        schema: state.schema
    };    
};

export class Form extends React.Component<IFormProps, IFormState> {
    private factory: IFormFieldFactory;
    public childControls: JSX.Element[];

    constructor(props){
        super(props);
        this.factory = new UiFabricFormFieldFactory(this.props.dataSource);

        const childrenSchema = this.props.schema[this.props.formName];

        if(childrenSchema.childControls && childrenSchema.childControls.length > 0){
            this.childControls = childrenSchema.childControls.map((childSchema) => {
                return this.factory.createControl(childSchema, 0, this.onChildFieldValueChanged.bind(this));
            });
        }
    }

    public onChildFieldValueChanged(newFieldValue: IFieldData): void {
        console.log("Field value changed :"+newFieldValue.value);
        this.props.dispatch(changeFieldValue(newFieldValue, "Test", 0));
    }

    public render(): JSX.Element {
        return (
            <div className={"ms-Grid" }>
                {this.childControls}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Form);
