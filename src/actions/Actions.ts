import { ActionTypes, Action } from "./ActionTypes";
import IField from "../model/IField";

const changeFieldValue = (newFieldValue: IField, detailList: string, rowIndex: number): Action => ({
    type: ActionTypes.FIELD_VALUE_CHANGED,
    payload: newFieldValue,
    detailList: detailList,
    rowIndex: rowIndex
});