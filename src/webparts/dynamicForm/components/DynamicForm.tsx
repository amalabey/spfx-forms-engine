import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { createStore } from "../../../store";
import IFormData from "../../../model/IFormData";
import styles from './DynamicForm.module.scss';
import { IDynamicFormProps } from './IDynamicFormProps';
import { ItemMode } from '../../../model/IItemData';
import { FieldMode } from '../../../model/IFieldData';
import Form from "../../../components/Form";

import { mockState } from "../mock";
import { IState } from '../../../store/IState';

export default class DynamicForm extends React.Component<IDynamicFormProps, {}> {
  private store: Store<IState>;

  constructor(props){
    super(props);
    // Sample data
    this.store = createStore(mockState);
  }

  public render(): React.ReactElement<IDynamicFormProps> {
    return (
      <Provider store={this.store}>
        <Form />
      </Provider>
    );
  }
}
