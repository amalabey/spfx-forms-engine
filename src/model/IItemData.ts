import IFieldData from "./IFieldData";

export enum ItemMode {
    NEW,
    EDIT,
    VIEW,
    LIST
}

export default interface IItemData {
    listName: string;
    mode: ItemMode;
    fields: { [index: string] : IFieldData };
    index?: number;
}