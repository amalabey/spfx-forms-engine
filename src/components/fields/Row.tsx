import * as React from "react";
import { IFormElementProps } from "./IFormElementProps";

export interface IRowProps extends IFormElementProps {
}

export interface IRowState {
}

export default class Row extends React.Component<IRowProps, IRowState> {
    public render(): JSX.Element {
        return (<div className={`ms-Grid-row ${this.props.css?this.props.css:""}`}>
                </div>);
    }
}

