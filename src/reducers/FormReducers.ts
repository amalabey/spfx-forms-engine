import { Action, ActionTypes } from "../actions/ActionTypes";
import IFormData from "../model/IFormData";
import { Reducer } from 'redux';
import { IState } from "../store/IState";

//Reducer determines how the state should change after every action.
const formReducer: Reducer<IState> = (state: IState, action: Action): IState => {
	switch (action.type) {
		case ActionTypes.FIELD_VALUE_CHANGED:
			return state; //You can show a loading message here.
	}
};

export default formReducer;