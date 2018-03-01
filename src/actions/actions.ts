import { createAction } from "typesafe-actions";

export const TOGGLE_NUMBER = 'TOGGLE_NUMBER';
export const SELECT_NUMBER = 'SELECT_NUMBER';

export type TToggleNumberPayload = {
    row: number;
    col: number;
    number: number;
};

export type TSelectNumberPayload = {
    selectedNumber: number;
}

export type Actions = {
    TOGGLE_NUMBER: {
        type: typeof TOGGLE_NUMBER,
        payload: TToggleNumberPayload,
    },
    SELECT_NUMBER: {
        type: typeof SELECT_NUMBER,
        payload: TSelectNumberPayload,
    }
}

export type RootAction = Actions[keyof Actions];

export const actions = {
    toggleNumber: (payload: TToggleNumberPayload): Actions[typeof TOGGLE_NUMBER] => ({
        type: TOGGLE_NUMBER,
        payload,
    }),
    selectNumber: (payload: TSelectNumberPayload): Actions[typeof SELECT_NUMBER] => ({
        type: SELECT_NUMBER,
        payload,
    }),
}