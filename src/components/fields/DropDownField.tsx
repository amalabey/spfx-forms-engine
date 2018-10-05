import * as React from "react";
import { assign } from 'lodash';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent, createRef } from 'office-ui-fabric-react/lib/Utilities';

import { IFieldProps } from "./IFieldProps";
import IField from "../../model/IField";

export interface IDropDownFieldProps extends IFieldProps {
    placeholder?: string;
}

export default class DropDownField extends React.Component<IDropDownFieldProps, any> {
    private changeState(item: IDropdownOption): void {
        if(this.props.onFieldValueChanged){
            this.props.onFieldValueChanged(assign({}, this.props, { fieldValue: item.selected } as IField));
        }
    }

    public render(): JSX.Element {
        return (
            <Dropdown
                placeHolder={this.props.placeholder}
                label={this.props.label}
                id={this.props.name}
                options={this.props.field.options}
                onChange={this.changeState.bind(this)}
                />
        );
    }
}