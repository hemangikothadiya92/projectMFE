export const DATA_LIST = 'data added successfully.';

export class ProjectDataAction {
    readonly type = DATA_LIST;
    constructor(public payload?: {data: any[]}) {

    }
}