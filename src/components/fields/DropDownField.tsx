import * as React from "react";
import { assign } from 'lodash';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

import { IFieldProps } from "./IFieldProps";
import IFieldData from "../../model/IFieldData";

export interface IDropDownFieldProps extends IFieldProps {
    placeholder?: string;
}

export default class DropDownField extends React.Component<IDropDownFieldProps, any> {
    private changeState(item: IDropdownOption): void {
        if(this.props.onFieldValueChanged){
            //this.props.onFieldValueChanged(assign({}, this.props, { fieldValue: item.selected } as IFieldData));
        }
    }

    public render(): JSX.Element {
        return (
            <Dropdown
                placeHolder={this.props.placeholder}
                label={this.props.label}
                id={this.props.name}
                required={this.props.required}
                //options={this.props.field.options}
                onChange={this.changeState.bind(this)}
                />
        );
    }
}