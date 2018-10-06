import * as React from "react";
import { assign } from 'lodash';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import { IFieldProps } from "./IFieldProps";
import IFieldData from "../../model/IFieldData";

export interface ITextFormFieldProps extends IFieldProps {
    placeholder?: string;
}

export default class TextFormField extends React.Component<ITextFormFieldProps, any> {
    private changeState(newValue: string): void {
        if(this.props.onFieldValueChanged){
            this.props.onFieldValueChanged(assign({}, this.props, { value: newValue } as IFieldData));
        }
    }

    public render(): JSX.Element {
        return (
            <TextField label={this.props.label} 
                id={this.props.name}
                placeholder={this.props.placeholder}
                required={this.props.required} 
                onChange={this.changeState.bind(this)}/>
        );
    }
}