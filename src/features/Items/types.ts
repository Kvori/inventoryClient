import { DefaultFieldsValue } from "./consts";

export interface IItemValue {
    value: any,
    fieldId: number
}

type DefaultFieldTypes = {
    [K in keyof typeof DefaultFieldsValue]: 
      typeof DefaultFieldsValue[K] extends 'id' ? number : string;
  };
  
  export type IItem = DefaultFieldTypes & {
    id: number;
    itemValues: IItemValue[];
  };
