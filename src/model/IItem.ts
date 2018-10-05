import IField from "./IField";

export enum ItemMode {
    NEW,
    EDIT,
    VIEW,
    LIST
}

export default interface IItem {
    mode: ItemMode;
    fields: { [index: string] : IField };
    index?: number;
}