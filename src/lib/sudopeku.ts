import * as R from "ramda";

export class Board {
    size: number;
    house_width: number;

    board: number[][];

    constructor(size: number = 9) {
        if (size <= 0) {
            throw "size must be positive";
        } else if (Math.sqrt(size) % 1 != 0) {
            throw "size must be a square number";
        }

        this.house_width = Math.sqrt(size);
        this.size = size;

        this.board = R.range(1, size).map(() => R.repeat(9, size));
    }
}