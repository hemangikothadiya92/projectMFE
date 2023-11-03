import { ProjectReducer, ProjectReducerState, getData } from './project-reducer';  // Adjust the import path as needed
import { DATA_LIST } from '../actions/project-action';

describe('ProjectReducer', () => {
  it('should handle DATA_LIST action correctly', () => {
    const initialState: ProjectReducerState = {
      data: ['existingData'],
    };

    const action = {
      type: DATA_LIST,
      payload: { data: ['newData'] },
    };

    const newState = ProjectReducer(initialState, action);

    expect(newState.data).toEqual(['existingData', 'newData']);
  });

  it('should return the initial state for an unknown action', () => {
    
    const initialState: ProjectReducerState = {
      data: ['existingData'],
    };

    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {},
    };

    const newState = ProjectReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
