import { Position } from 'onix-chess';
import { BoardSize } from './Constants';

export interface BoardSettings {
    fen?: string,
    size: BoardSize,
    coords?: boolean,
    frame?: boolean,
    flip?: boolean,
    piece?: string,
    square?: string,
    markers?: string,
}

export type canMoveFunc = (from: number, to?: number) => boolean;
export type getPieceFunc = (sq: number) => number;

export var canMoveDefault: canMoveFunc = (from: number, to: number): boolean => {
    if (typeof to === "undefined") {
        return typeof from !== "undefined";
    }

    // const state: PositionState = this.store.getState();
    return true; // (to == Square.NullSquare) || (state.board.position.getPiece(to) == Piece.NoPiece);
}