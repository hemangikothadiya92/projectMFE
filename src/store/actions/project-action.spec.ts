import { ProjectDataAction, DATA_LIST } from './project-action';

describe('ProjectDataAction', () => {
  it('should create an instance of ProjectDataAction without a payload', () => {
    const action = new ProjectDataAction();

    expect(action.type).toEqual(DATA_LIST);
  });
});
