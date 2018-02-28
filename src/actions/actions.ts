import { createAction } from "typesafe-actions";

export const TOGGLE_NUMBER = 'TOGGLE_NUMBER';

export type ToggleNumberPayload = {
    row: number,
    col: number,
    number: number
};

export type Actions = {
    TOGGLE_NUMBER: {
        type: typeof TOGGLE_NUMBER,
        payload: ToggleNumberPayload,
    },
}

export type RootAction = Actions[keyof Actions];

export const actions = {
    toggleNumber: (payload: ToggleNumberPayload): Actions[typeof TOGGLE_NUMBER] => ({
        type: TOGGLE_NUMBER,
        payload,
    }),
}