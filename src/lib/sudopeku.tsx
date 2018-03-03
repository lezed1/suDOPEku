import * as React from "react";
import * as R from "ramda";
import { Map } from "immutable";

export class Board {
    size: number;
    house_width: number;

    board: Map<Location, Cell>;

    constructor(size: number = 9, board?: Map<Location, Cell>) {
        if (size <= 0) {
            throw "size must be positive";
        } else if (Math.sqrt(size) % 1 !== 0) {
            throw "size must be a square number";
        }

        this.house_width = Math.sqrt(size);
        this.size = size;

        if (board) {
            this.board = board;
        } else {
            this.board = Map();

            for (let i = 1; i <= size; i++) {
                for (let j = 1; j <= size; j++) {
                    this.board = this.board.set(new Location(i, j), new Blank());
                }
            }
        }
    }

    toggleValueByCell(row: number, col: number, value: number): Board {
        const loc = new Location(row, col);
        const new_board = this.board.set(loc, this.board.get(loc).toggleValue(value));
        return new Board(this.size, new_board);
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
    getComponent();

    toggleValue(value: number);
}

export class Number implements Cell {
    number: number;

    constructor(value: number) {
        this.number = value;
    }

    getComponent() {
        return this.number;
    }

    toggleValue(value: number) {
        if (this.number = value) {
            return new Blank();
        } else {
            return this;
        }
    }
}

export class Blank implements Cell {
    getComponent() {
        return null;
    }

    toggleValue(value: number) {
        return new Number(value);
    }
}