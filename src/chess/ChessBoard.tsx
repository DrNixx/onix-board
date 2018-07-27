import * as React from 'react';
import { BoardRelatedStore } from './BoardState';
import { DumbBoard } from './DumbBoard';
import { canMoveFunc, canMoveDefault } from './BoardSettings';

export interface ChessBoardProps {
    store: BoardRelatedStore,
    dnd: boolean,
    legal?: boolean,
    canMove?: canMoveFunc
}

export interface ChessBoardState {
    previousButtonEnabled: boolean;
    nextButtonEnabled: boolean;
}

export class ChessBoard extends React.Component<ChessBoardProps, ChessBoardState> {
    public static defaultProps: ChessBoardProps = {
        store: null,
        dnd: false,
        canMove: canMoveDefault,
    }
    
    /**
     * constructor
     */
    constructor(props: ChessBoardProps) {
        super(props);
    }

    render() {
        const { store, dnd, legal, canMove } = this.props;
        
        return (
            <DumbBoard
                store={store} 
                dnd={dnd}
                legal={legal}
                canMove={canMove} 
            />
        );
    }
}
