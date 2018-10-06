import IFieldData from "../model/IFieldData";

export enum ActionTypes {
    FIELD_VALUE_CHANGED,
    FORM_LOADING,
    FORM_LOADED,
    FORM_SAVE_REQUEST,
    FORM_SAVE_SUCCESS,
    FORM_SAVE_ERROR
}

export type Action = 
    {
        type: ActionTypes.FIELD_VALUE_CHANGED, 
        payload: IFieldData,
        listName?: string,
        rowIndex?: number
    };