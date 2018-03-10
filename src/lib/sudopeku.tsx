import * as React from "react";
import * as R from "ramda";
import { Map } from "immutable";

export const SIZE = 9;
export const SQUARE_HOUSE_WIDTH = 3;

function isValidValue(value) {
    return value >= 1 && value <= 9 && value % 1 === 0;
}

export class Board {
    board: Map<Location, Cell>;

    constructor(board?: Map<Location, Cell>) {

        if (board) {
            this.board = board;
        } else {
            this.board = Map();

            for (let i = 1; i <= SIZE; i++) {
                for (let j = 1; j <= SIZE; j++) {
                    this.board = this.board.set(new Location(i, j), new Blank());
                }
            }
        }
    }

    toggleValueByCell(row: number, col: number, value: number): Board {
        const loc = new Location(row, col);
        const new_board = this.board.set(loc, this.board.get(loc).toggleValue(value));
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
    getComponent(selectedValue: number);
    getCellClass(selectedValue: number): string;

    toggleValue(value: number);
}

export class Value implements Cell {
    value: number;

    constructor(value: number) {
        this.value = value;
    }

    getComponent(selectedValue: number) {
        return <div className="value">{this.value}</div>;
    }

    getCellClass(selectedValue: number): string {
        if (this.value === selectedValue) {
            return "selected";
        }

        return "";
    }

    toggleValue(value: number) {
        if (this.value === value) {
            return new Blank();
        } else {
            return this;
        }
    }
}

export class Blank implements Cell {
    getComponent(selectedValue: number) {
        return <div className="blank" />;
    }

    getCellClass(selectedValue: number): string {
        return "";
    }

    toggleValue(value: number) {
        if (!isValidValue(value)) {
            return this;
        }
        return new Value(value);
    }
}
