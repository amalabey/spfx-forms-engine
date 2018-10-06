import * as React from "react";
import { IFormElementProps } from "./IFormElementProps";

export type GridColumnIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IColumnProps extends IFormElementProps {
    large?: GridColumnIndex;
    medium?: GridColumnIndex;
    small?: GridColumnIndex;
}

export interface IColumnState {
}

export default class Column extends React.Component<IColumnProps, IColumnState> {
    public render(): JSX.Element {
        return (<div className={`ms-Grid-col ${this.props.css?this.props.css:""} ${this.props.large?"ms-lg"+this.props.large:""} ${this.props.medium?"ms-lg"+this.props.medium:""} ${this.props.small?"ms-lg"+this.props.small:""}`}>
                </div>);
    }
}

