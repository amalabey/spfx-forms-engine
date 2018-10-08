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
      }],
      "Scheduling Request Resources":[{
        mode: ItemMode.NEW,
        fields:{
          department: {
            displayName: "Department",
            internalName: "department",
            mode: FieldMode.NEW,
            type: "Text",
            value: "Data Anlaytics"
          },
          role: {
            displayName: "Role",
            internalName: "role",
            mode: FieldMode.NEW,
            type: "Text",
            value: "Senior Consultant"
          },
          numberOfResources: {
            displayName: "Number Of Resources",
            internalName: "numberOfResources",
            mode: FieldMode.NEW,
            type: "Text",
            value: "10"
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