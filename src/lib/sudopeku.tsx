import * as React from "react";
import * as R from "ramda";
import { Map, OrderedSet } from "immutable";

export const SIZE = 9;
export const SQUARE_HOUSE_WIDTH = 3;

export type SelectionerState = {
    readonly selectedValue: number;
    readonly isPencil: boolean;
};

function isValidValue(value) {
    return value >= 1 && value <= 9 && value % 1 === 0;
}

export class Board {
    board: Map<Location, Cell>;

    constructor(board: Map<Location, Cell>) {
        this.board = board;
    }

    static createEmpty() {
        const board: Map<Location, Cell> = Map().withMutations(board => {
            for (let i = 1; i <= SIZE; i++) {
                for (let j = 1; j <= SIZE; j++) {
                    board = board.set(new Location(i, j), new Blank());
                }
            }
            return board;
        }) as Map<Location, Cell>;

        return new Board(board);
    }

    toggleValueByCell(row: number, col: number, selectionerState: SelectionerState): Board {
        const loc = new Location(row, col);
        const new_board = this.board.set(loc, this.board.get(loc).toggleValue(selectionerState));
        return new Board(new_board);
    }
}

export class Location {
    row: number;
    col: number;

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    equals(locaiton: Location) {
        return this.row === locaiton.row && this.col === locaiton.col;
    }

    hashCode() {
        return this.row + 37 * this.col;
    }
}

export interface Cell {
    getComponent(selectionerState: SelectionerState);
    getCellClass(selectionerState: SelectionerState): string;

    toggleValue(selectionerState: SelectionerState): Cell;
}

export class Value implements Cell {
    value: number;

    constructor(value: number) {
        // TODO: Assert valid value.
        this.value = value;
    }

    getComponent(selectionerState: SelectionerState) {
        return <div className="value">{this.value}</div>;
    }

    getCellClass(selectionerState: SelectionerState): string {
        if (this.value === selectionerState.selectedValue) {
            return "selected";
        }

        return "";
    }

    toggleValue(selectionerState: SelectionerState) {
        if (this.value === selectionerState.selectedValue && !selectionerState.isPencil) {
            return new Blank();
        } else {
            return this;
        }
    }
}

export class Pencil implements Cell {
    values: OrderedSet<number>;

    constructor(values: OrderedSet<number>) {
        // TODO: Assert valid value
        this.values = values.sort() as OrderedSet<number>;
    }

    static ofSingle(value: number) {
        return new Pencil(OrderedSet.of(value));
    }

    getComponent(selectionerState: SelectionerState) {
        return this.values.map((v) => `${v} `);
    }

    getCellClass(selectionerState: SelectionerState): string {
        if (this.values.has(selectionerState.selectedValue)) {
            return "selectedPencil";
        }

        return "";
    }

    toggleValue(selectionerState: SelectionerState): Cell {
        if (!isValidValue(selectionerState.selectedValue)) {
            return this;
        } else if (!selectionerState.isPencil) {
            return new Value(selectionerState.selectedValue);
        } else if (this.values.has(selectionerState.selectedValue)) {
            if (this.values.size === 1) {
                return new Blank();
            } else {
                return new Pencil(this.values.delete(selectionerState.selectedValue));
            }
        } else {
            return new Pencil(this.values.add(selectionerState.selectedValue));
        }
    }
}

export class Blank implements Cell {
    getComponent(selectionerState: SelectionerState) {
        return <div className="blank" />;
    }

    getCellClass(selectionerState: SelectionerState): string {
        return "";
    }

    toggleValue(selectionerState: SelectionerState) {
        if (!isValidValue(selectionerState.selectedValue)) {
            return this;
        } else if (selectionerState.isPencil) {
            return Pencil.ofSingle(selectionerState.selectedValue);
        }
        return new Value(selectionerState.selectedValue);
    }
}
