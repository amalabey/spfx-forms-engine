import { ActionTypes, Action } from "./ActionTypes";
import IFieldData from "../model/IFieldData";

export function changeFieldValue(newFieldValue: IFieldData, listName: string, rowIndex: number){
    return {
        type: ActionTypes.FIELD_VALUE_CHANGED,
        payload: newFieldValue,
        listName: listName,
        rowIndex: rowIndex
    };
}