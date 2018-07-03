import * as React from 'react';
import { BoardRelatedStore } from './BoardState';
import { DumbBoard } from './DumbBoard';

export interface ChessBoardProps {
    store: BoardRelatedStore,
    dnd: boolean,
    legal?: boolean,
    getPiece: (sq: number) => number
}

export interface ChessBoardState {
    previousButtonEnabled: boolean;
    nextButtonEnabled: boolean;
}

export class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    /**
     * constructor
     */
    constructor(props: ChessBoardProps) {
        super(props);
    }

    render() {
        const { store, dnd, legal, getPiece } = this.props;
        const state = store.getState();
        const { fen, size, coords, frame, flip, selection, canMove, doMove } = state.board;

        return (
            <DumbBoard
                store={store} 
                dnd={dnd}
                legal={legal}
                getPiece={getPiece} />
        );
    }
}
