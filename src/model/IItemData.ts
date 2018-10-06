import IFieldData from "./IFieldData";

export enum ItemMode {
    NEW,
    EDIT,
    VIEW,
    LIST
}

export default interface IItemData {
    mode: ItemMode;
    fields: { [index: string] : IFieldData };
    index?: number;
}