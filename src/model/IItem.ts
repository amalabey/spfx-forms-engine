import IFieldValue from "./IField";

export default interface IItem {
    fields: { [index: string] : IFieldValue };
}