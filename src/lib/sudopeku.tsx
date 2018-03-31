import * as React from "react";
import * as R from "ramda";
import { Map, OrderedSet, List, Collection } from "immutable";
import * as assert from "assert";

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

    autoPencil() {
        console.log("Autopencil!");
        let new_board = this.board;

        for (let row = 1; row <= SIZE; row++) {
            for (let col = 1; col <= SIZE; col++) {
                const loc = new Location(row, col);

                if (!this.board.get(loc).isValue()) {
                    const adjacentCells = this.getCellsOfLocations(MultiLocation.allAdjacent(loc).locations);
                    const adjacentValues = adjacentCells
                        .filter(cell => cell && cell.isValue())
                        .map((value: Value) => value.value);
                    const candidates = OrderedSet(R.range(1, 10)).subtract(adjacentValues);

                    new_board = new_board.set(loc, new Pencil(candidates));
                }
            }
        }

        return new Board(new_board);
    }

    getCellsOfLocations(locs: List<Location>) {
        return locs.map(loc => this.board.get(loc));
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

export class MultiLocation {
    locations: List<Location>;
    name: string;

    constructor(locations: List<Location>, name: string) {
        this.locations = locations;
        this.name = name;
    }

    static rowHouse(row: number) {
        let locations = R.range(1, 10).map((col) => new Location(row, col));

        return new MultiLocation(List(locations), `Row ${row}`);
    }

    static rowHouseContaining(location: Location) {
        return MultiLocation.rowHouse(location.row);
    }

    static colHouse(col: number) {
        let locations = R.range(1, 10).map((row) => new Location(row, col));

        return new MultiLocation(List(locations), `Col ${col}`);
    }

    static colHouseContaining(location: Location) {
        return MultiLocation.colHouse(location.col);
    }

    static blockHouse(block: number) {
        let locations = [];

        const baseRow = Math.floor(block / 3) * 3;
        const baseCol = block % 3 * 3;

        for (let row = 1; row <= 3; row++) {
            for (let col = 1; col <= 3; col++) {
                locations.push(new Location(baseRow + row, baseCol + col));
            }
        }

        return new MultiLocation(List(locations), `Block ${block}`);
    }

    static blockHouseContaining(location: Location) {
        return MultiLocation.blockHouse(1 + Math.floor((location.row - 1) / 3) * 3 + Math.floor((location.col - 1) / 3));
    }

    static allAdjacent(location: Location) {
        const rowHouse = this.rowHouseContaining(location);
        const colHouse = this.colHouseContaining(location);
        const blockHouse = this.blockHouseContaining(location);

        let locations = OrderedSet<Location>().union(rowHouse.locations, colHouse.locations, blockHouse.locations);

        return new MultiLocation(locations.toList(), `Adjacent to ${location}`);
    }
}

console.log(MultiLocation.blockHouseContaining(new Location(6, 6)));


export interface Cell {
    isValue();

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

    isValue() {
        return true;
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

    isValue() {
        return false;
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

    isValue() {
        return false;
    }
}
