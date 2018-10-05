import IItem from "./IItem";

export default interface IForm {
    master: IItem;
    detail: { [index: string] : IItem[] };
}