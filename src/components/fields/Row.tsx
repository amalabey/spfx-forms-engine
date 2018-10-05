import * as React from "react";

export interface IRowProps {
    css?: string;
}

export interface IRowState {
}

export default class Row extends React.Component<IRowProps, IRowState> {
    public render(): JSX.Element {
        return (<div className={`ms-Grid-row ${this.props.css?this.props.css:""}`}>
                </div>);
    }
}

