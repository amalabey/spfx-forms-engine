import IField from "./IField";

export default interface IItem {
    fields: { [index: string] : IField };
}