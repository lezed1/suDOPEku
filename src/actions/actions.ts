import { createAction } from "typesafe-actions";

export const TOGGLE_VALUE = "TOGGLE_VALUE";
export const SELECT_VALUE = "SELECT_VALUE";

export type TToggleValuePayload = {
    row: number;
    col: number;
    value: number;
};

export type TSelectValuePayload = {
    selectedValue: number;
};

export type Actions = {
    TOGGLE_VALUE: {
        type: typeof TOGGLE_VALUE,
        payload: TToggleValuePayload,
    },
    SELECT_VALUE: {
        type: typeof SELECT_VALUE,
        payload: TSelectValuePayload,
    }
};

export type RootAction = Actions[keyof Actions];

export const actions = {
    toggleValue: (payload: TToggleValuePayload): Actions[typeof TOGGLE_VALUE] => ({
        type: TOGGLE_VALUE,
        payload,
    }),
    selectValue: (payload: TSelectValuePayload): Actions[typeof SELECT_VALUE] => ({
        type: SELECT_VALUE,
        payload,
    }),
};