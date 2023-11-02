
import { DATA_LIST } from '../actions/project-action';
import { Action } from '../actions/index';

export interface ProjectReducerState {
    data: any[];
}

const initialState: ProjectReducerState = {
    data: []
}

export function ProjectReducer(state = initialState, action: Action) : ProjectReducerState {
    switch (action.type) {
        case DATA_LIST: {
            const updatedData = state.data.concat(action.payload.data);
            return {...state, data: updatedData};
        }
        default: {
            return state;
        }
    }
    
}

//Selector

export const getData = (state: ProjectReducerState) => state.data;