import { ActionTypes, Action } from "./ActionTypes";
import IFieldData from "../model/IFieldData";

const changeFieldValue = (newFieldValue: IFieldData, detailList: string, rowIndex: number): Action => ({
    type: ActionTypes.FIELD_VALUE_CHANGED,
    payload: newFieldValue,
    detailList: detailList,
    rowIndex: rowIndex
});