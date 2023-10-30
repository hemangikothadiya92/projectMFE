import { ActionReducerMap, createSelector } from "@ngrx/store";
import * as fromProject from "./project-reducer";

export interface RootReducerState {
    data: fromProject.ProjectReducerState;
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
    data: fromProject.ProjectReducer
}

export const getDataState = (state: RootReducerState) => state.data;

export const getData = createSelector(getDataState, fromProject.getData);