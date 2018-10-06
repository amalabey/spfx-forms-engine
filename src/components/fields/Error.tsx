import * as React from "react";
import { assign } from 'lodash';
import { Label } from 'office-ui-fabric-react/lib/Label';

import { IFieldProps } from "./IFieldProps";
import IFieldData from "../../model/IFieldData";

export interface IErrorFormFieldProps extends IFieldProps {
    message?: string;
}

export default class ErrorFormField extends React.Component<IErrorFormFieldProps, any> {
    public render(): JSX.Element {
        return (
            <Label>{this.props.message}</Label>
        );
    }
}