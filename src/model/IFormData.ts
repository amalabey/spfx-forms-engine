import IItemData from "./IItemData";

export default interface IFormData {
    lists: { [index: string] : IItemData[] };
}