import * as React from 'react';
import { Color, Piece, Square } from 'onix-chess';
import { BoardRelatedStore } from '../chess/BoardState';
import { Orientation, BoardSizeClass } from '../chess/Constants';
import { ChessSquare } from '../chess/ChessSquare';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export interface DumbHolderProps {
    store: BoardRelatedStore,
    orient: Orientation,
}

@DragDropContext(HTML5Backend)
export class DumbHolder extends React.Component<DumbHolderProps, {}> {
    /**
     * constructor
     */
    constructor(props: DumbHolderProps) {
        super(props);
    }

    protected classNames(): string {
        const { orient, store } = this.props;
        const state = store.getState();
        const { size } = state.board;

        var cssClass = [
            orient == Orientation.Horizontal ? "ha" : "va", 
            BoardSizeClass[size]
        ];

        return cssClass.join(" ");
    }

    renderSquare(c: number, p: number) {
        var piece = Piece.create(c, p);
        var name = Piece.pieceName(piece);
        var color = Square.color(c + p);

        const { store } = this.props;

        return (
            <ChessSquare 
                store={store}
                coord={Square.NullSquare} 
                color={color} 
                name={name} 
                piece={piece} 
                dnd={true}
                key={name} />
        );
    }

    renderSquares() {
        var squares = [];
        if (this.props.orient == Orientation.Horizontal) { 
            for (var c = Color.White; c <= Color.Black; c++) {
                for (var p = Piece.King; p <= Piece.Pawn; p++) {
                    squares.push(this.renderSquare(c, p));
                }
            }
        } else {
            for (var p = Piece.King; p <= Piece.Pawn; p++) {
                for (var c = Color.White; c <= Color.Black; c++) {
                    squares.push(this.renderSquare(c, p));
                }
            }
        }

        return squares;
    }

    render() {
        const { store } = this.props;

        return (
            <div className={this.classNames()}>
                <div className="holder-body">
                    <div className="board-border">
                        <div className="board-frame">
                            <div className="board-squares">
                                {this.renderSquares()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}