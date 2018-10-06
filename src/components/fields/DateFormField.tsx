import * as React from "react";
import { assign } from 'lodash';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';

import { IFieldProps } from "./IFieldProps";
import IFieldData from "../../model/IFieldData";

export interface IDateFormFieldProps extends IFieldProps {
    placeholder?: string;
}

export default class DateFormField extends React.Component<IDateFormFieldProps, any> {
    private changeState(newValue: Date): void {
        if(this.props.onFieldValueChanged){
            //this.props.onFieldValueChanged(assign({}, this.props, { fieldValue: newValue } as IFieldData));
        }
    }

    public render(): JSX.Element {
        return (
            <DatePicker
                firstDayOfWeek={DayOfWeek.Sunday}
                placeholder={this.props.placeholder}
                onSelectDate={this.changeState.bind(this)}
            />
        );
    }
}