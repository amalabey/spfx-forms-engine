import { Action, ActionTypes } from "../actions/ActionTypes";
import IForm from "../model/IForm";
import { Reducer } from 'redux';

const initState: IForm = { master: null, detail: null };

//Reducer determines how the state should change after every action.
const formReducer: Reducer<IForm> = (state: IForm = initState, action: Action): IForm => {
	switch (action.type) {
		case ActionTypes.FIELD_VALUE_CHANGED:
			return state; //You can show a loading message here.
	}
};

export default formReducer;