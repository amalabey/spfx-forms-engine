import * as React from "react";
import { assign } from 'lodash';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    IColumn
  } from 'office-ui-fabric-react/lib/DetailsList';

import IItem from "../../model/IItem";

export interface IDataGridColumn {
    name: string;
    key: string;
    fieldName: string;
    minWidth?: number;
    maxWidth?: number;
    isRowHeader?: boolean;
    isResizable?: boolean;
    isSorted?: boolean;
    isSortedDescending?: boolean;
    sortAscendingAriaLabel?: string;
    sortDescendingAriaLabel?: string;
    isPadded?: true;
}

export interface IDataGridProps {
    name: string;
    dataSource?: string;
    columns: IDataGridColumn[];
    items: IItem[];
    newAction: boolean;
    editAction: boolean;
    deleteAction: boolean;
}

export default class DataGrid extends React.Component<IDataGridProps, any> {

    public render(): JSX.Element {
        const columns: IColumn[] = this.props.columns.map((col) => {
            return {key: col.key,
                name: col.name,
                fieldName: col.fieldName,
                minWidth: col.minWidth,
                maxWidth: col.maxWidth,
                isResizable: col.isResizable,
                onRender: this.renderCell.bind(this),
                isPadded: col.isPadded} as IColumn;
        });

        return (
            <DetailsList
                items={this.props.items}
                columns={columns}
                selectionMode={SelectionMode.none}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}                
            />
        );
    }

    private renderCell(item: IItem, index: number, column: IColumn): void {
        
    }
}