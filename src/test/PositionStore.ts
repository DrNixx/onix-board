import { Store, createStore as reduxCreateStore, combineReducers, AnyAction } from 'redux';
import { BoardState } from '../chess/BoardState';
import { boardReducer } from '../chess/BoardReducer';
import { Square, Piece, Position, FenStandartStart } from 'onix-chess';
import { BoardSize } from '../chess';

export interface PositionState {
    board: BoardState
}

export type PositionStore = Store<PositionState>;

export const createPositionStore = (preloadedState: PositionState) =>
    reduxCreateStore(
        combineReducers<PositionState>({
            board: boardReducer
        }), preloadedState);


export var store: Store<PositionState, AnyAction>;

const canMove = (from: number, to: number): boolean => {
    if (typeof to === "undefined") {
        return typeof from !== "undefined";
    }

    // const state: PositionState = this.store.getState();
    return true; // (to == Square.NullSquare) || (state.board.position.getPiece(to) == Piece.NoPiece);
}

const doMove = (from: number, to: number, piece: number) => {
    const state: PositionState = store.getState();
    const position = state.board.position;

    if (from !== Square.NullSquare) {
        piece = piece || position.getPiece(from);
        if (!position.removePiece(piece, from)) {
            return false;
        }
    }

    if (piece && to !== Square.NullSquare) {
        const captured = position.getPiece(to)
        if (captured !== Piece.NoPiece) {
            position.removePiece(captured, to);
        }

        if (!position.addPiece(piece, to)) {
            return false;
        }
    }

    let fen = position.writeFEN();
    return fen;
}

store = createPositionStore({
    board: {
        size: BoardSize.Normal,
        piece: "merida",
        square: "color-blue",
        flip: false,
        coords: true,
        frame: true,
        moveturn: true,
        position: new Position(FenStandartStart),
        fen: FenStandartStart,
        selection: {
            from: {
                piece: Piece.NoPiece,
                square: Square.NullSquare
            }
        },
        canMove: canMove,
        doMove: doMove
    }
});