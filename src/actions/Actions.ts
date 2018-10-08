import { ActionTypes, Action } from "./ActionTypes";
import IFieldData from "../model/IFieldData";
import IItemData from "../model/IItemData";

export function changeFieldValue(item: IItemData, newFieldValue: IFieldData, listName: string, rowIndex: number){
    return {
        type: ActionTypes.FIELD_VALUE_CHANGED,
        item: item,
        payload: newFieldValue,
        listName: listName,
        rowIndex: rowIndex
    };
}