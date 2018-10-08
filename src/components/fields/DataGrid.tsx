import * as React from "react";
import { assign } from 'lodash';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    IColumn
  } from 'office-ui-fabric-react/lib/DetailsList';

import IItemData from "../../model/IItemData";
import { IFormElementProps } from "./IFormElementProps";
import IFormFieldFactory from "../../services/IFormFieldFactory";
import IFieldData from "../../model/IFieldData";

export interface IDataGridProps extends IFormElementProps {
    name: string;
    dataSource?: string;
    columnSchema: any;
    items: IItemData[];
    newAction: boolean;
    editAction: boolean;
    deleteAction: boolean;
    factory: IFormFieldFactory;
    onFieldValueChanged?(newFieldValue: IFieldData): void;
}

export default class DataGrid extends React.Component<IDataGridProps, any> {
    private columns: IColumn[];
    private columnControlSchema: { [index: string] : any };

    constructor(props){
        super(props);
        this.buildColumns(this.props.columnSchema);
    }

    private buildColumns(columnSchema: any[]): void {
        if(columnSchema){
            this.columns = [];
            this.columnControlSchema = {};
            const self = this;
            columnSchema.forEach((columnDefinition) => {
                const {minWidth, maxWidth, isRowHeader, isResizable, isSorted,
                    isSortedDescending, sortAscendingAriaLabel, sortDescendingAriaLabel, isPadded,
                    ...fieldProps
                }  = columnDefinition; // Column definition contains a mix of column metadata and field metadata

                const name: string = fieldProps.name;
                if(!name){
                    throw new Error("Unable to find required attribute 'name' in the column definition");
                }

                const displayName: string = fieldProps.displayName? fieldProps.displayName : name;

                const column: IColumn = { key: name, name: displayName, fieldName: name,
                    minWidth: minWidth, maxWidth: maxWidth, isRowHeader: isRowHeader,
                    isResizable: isResizable, isSorted: isSorted, isSortedDescending: isSortedDescending,
                    sortAscendingAriaLabel, sortDescendingAriaLabel, isPadded: isPadded,
                    onRender: this.renderCell.bind(self)
                };

                this.columns.push(column);
                this.columnControlSchema[column.name] = fieldProps;
            });
        }
    }

    public render(): JSX.Element {
        if(this.columns !== null && this.columns.length > 0){
            return (
                <DetailsList
                    items={this.props.items}
                    columns={this.columns}
                    selectionMode={SelectionMode.none}
                    setKey="set"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}                
                />
            );
        }else{
            return <span>DataGrid: Invalid column schema</span>;
        }        
    }

    private renderCell(item: IItemData, index: number, column: IColumn) {
        const controlSchema: any = this.columnControlSchema[column.name];
        return this.props.factory.createControlWithData(controlSchema, index, this.onControlValueChanged.bind(this), item);
    }

    private onControlValueChanged(newFieldValue: IFieldData): void {
        if(this.props.onFieldValueChanged){
            this.props.onFieldValueChanged(newFieldValue);
        }
    }
}