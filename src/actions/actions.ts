import { createAction } from "typesafe-actions";
import { SelectionerState } from "../lib/sudopeku";

export const TOGGLE_VALUE = "TOGGLE_VALUE";
export const SELECT_VALUE = "SELECT_VALUE";
export const TOGGLE_PENCIL = "TOGGLE_PENCIL";
export const AUTO_PENCIL = "AUTO_PENCIL";

export type TToggleValuePayload = {
    row: number;
    col: number;
    selectionerState: SelectionerState;
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
    TOGGLE_PENCIL: {
        type: typeof TOGGLE_PENCIL,
    }
    AUTO_PENCIL: {
        type: typeof AUTO_PENCIL,
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
    togglePencil: (): Actions[typeof TOGGLE_PENCIL] => ({
        type: TOGGLE_PENCIL,
    }),
    autoPencil: (): Actions[typeof AUTO_PENCIL] => ({
        type: AUTO_PENCIL,
    })
};