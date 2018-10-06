import IFormData from "../../../model/IFormData";
import { FieldMode } from "../../../model/IFieldData";
import { ItemMode } from "../../../model/IItemData";

import * as schema from "./formschema.json";
import { IState } from "../../../store/IState";

export const mockFormData = {
    lists: {
      "Scheduling Requests":[{
        mode: ItemMode.NEW,
        fields:{
          state: {
            displayName: "State",
            internalName: "state",
            mode: FieldMode.NEW,
            type: "Text",
            value: "VIC"
          },
          clientName: {
            displayName: "Client Name",
            internalName: "clientName",
            mode: FieldMode.NEW,
            type: "Text",
            value: "Readify PTY LTD"
          }
        }
      }]
    }
  } as IFormData;


export const mockState = {
  dataSource: mockFormData,
  schema: schema,
  formName: "newform"
} as IState;