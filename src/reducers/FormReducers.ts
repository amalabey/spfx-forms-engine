import { Action, ActionTypes } from "../actions/ActionTypes";
import IFormData from "../model/IFormData";
import { Reducer } from 'redux';

const initState: IFormData = { lists: null };

//Reducer determines how the state should change after every action.
const formReducer: Reducer<IFormData> = (state: IFormData = initState, action: Action): IFormData => {
	switch (action.type) {
		case ActionTypes.FIELD_VALUE_CHANGED:
			return state; //You can show a loading message here.
	}
};

export default formReducer;