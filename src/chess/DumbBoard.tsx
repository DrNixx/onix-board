import * as React from 'react';
import * as classNames from 'classnames';
import { Square } from 'onix-chess';
import { BoardRelatedStore } from './BoardState';
import { ChessSquare } from './ChessSquare';
import { BoardSizeClass } from './Constants';
import { BoardMovement } from './BoardSelection';
import { canMoveFunc, canMoveDefault } from './BoardSettings';

export interface DumbBoardProps {
    store: BoardRelatedStore,
    dnd: boolean,
    legal: boolean,
    canMove: canMoveFunc,
}

export interface DumbBoardState {
    previousButtonEnabled: boolean;
    nextButtonEnabled: boolean;
}

export class DumbBoard extends React.Component<DumbBoardProps, DumbBoardState> {
    /**
     * constructor
     */
    constructor(props: DumbBoardProps) {
        super(props);
    }

    protected renderSquare(i: number, piece: number, selection: BoardMovement) {
        var name = Square.squareName(i);
        const { store, dnd, legal, canMove } = this.props;
        
        return <ChessSquare 
            store={store}
            coord={i} 
            piece={piece} 
            key={name} 
            dnd={dnd} 
            legal={legal}
            selection={selection}
            canMove={canMove}
        />;
    }

    private renderLabels(flip: boolean) {
        let fl = [], rl = [];
        const FYLES = 'abcdefgh';
        const RANKS = '12345678';
        
        for (let i = 0; i < 8; i++) {
            let f = flip ? FYLES[7 - i] : FYLES[i];
            let r = flip ? RANKS[i] : RANKS[7 - i];
            
            fl.push(<li key={'f' + f}><span>{f}</span></li>);
            rl.push(<li key={'r' + r}><span>{r}</span></li>);
        }

        return [
            <ul key="fl" className="board-labels board-fyles-labels">{fl}</ul>,
            <ul key="rl" className="board-labels board-rows-labels">{rl}</ul>
        ];
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { flip, size, coords, frame, selection, position } = state.board;

        let squares = [];
        
        for (let i = 0; i < 64; i++) {
                const sq = (flip) ? (Square.rank(i) * 8 + (7 - Square.fyle(i))) : 63 - Square.rank(i) * 8 - (7 - Square.fyle(i));
                const piece = position.getPiece(sq);
                squares.push(this.renderSquare(sq, piece, selection));
        }

        const classes = classNames(BoardSizeClass[size], {
            ['inboard']: !frame,
            ['nolabel']: !coords
        });

        return (
            <div className={classes}>
                <div className="board-body">
                    <div className="board-border">
                        <div className="board-frame">
                            <div className="board-squares">
                                {squares}
                            </div>
                        </div>
                        {this.renderLabels(flip)}
                    </div>
                </div>
            </div>
        );
    }
}
