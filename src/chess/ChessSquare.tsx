import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DropTarget, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { BoardRelatedStore } from './BoardState';
import { Piece, Square } from 'onix-chess';
import { ChessPiece } from './ChessPiece';
import { DumbSquare } from './DumbSquare';
import { BoardAction } from './BoardActions';
import * as boardActions from './BoardActionConsts';
import { Logger } from 'onix-core';
import { BoardMovement } from './BoardSelection';
import { canMoveFunc, canMoveDefault } from './BoardSettings';

export interface SquareProps {
    store: BoardRelatedStore,
    coord: number,
    color?: number,
    name?: string,
    piece?: number,
    legal?: boolean,
    dnd: boolean,
    selection?: BoardMovement,
    canMove?: canMoveFunc,

    connectDropTarget?: ConnectDropTarget,
    isOver?: boolean,
    canDrop?: boolean,
}

interface dragInfo {
    from: number;
    piece: number;
}

const squareTarget: DropTargetSpec<SquareProps> = {
    canDrop(props: SquareProps, monitor: DropTargetMonitor) {
        const draggedItem = monitor.getItem() as dragInfo;
        const fromSquare = draggedItem.from;
        const { coord: toSquare, canMove } = props;
        
        return canMove(fromSquare, toSquare);
    },

    drop(props: SquareProps, monitor: DropTargetMonitor) {
        const draggedItem = monitor.getItem() as dragInfo;
        const { from, piece } = draggedItem;
        const to = props.coord;

        Logger.debug("ChessSquare drop");

        props.store.dispatch({type: boardActions.BOARD_MOVE, from: from, to: to, piece: piece } as BoardAction);
    }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

@DropTarget("DND_TYPES.PIECE", squareTarget, collect)
export class ChessSquare extends React.Component<SquareProps, {}> {
    public static defaultProps: SquareProps = {
        store: null,
        coord: 0,
        color: 0,
        name: "a1",
        piece: Piece.NoPiece,
        legal: true,
        dnd: false,
        selection: null,
        canMove: canMoveDefault,
    }

    /**
     * constructor
     */
    constructor(props: SquareProps) {
        super(props);
    }

    renderPiece? = () => {
        const { store, piece, dnd, coord, selection, canMove } = this.props;
        
        if ((piece !== null) && (piece !== Piece.NoPiece)) {
            const selected = selection && (selection.from.square === coord) && (selection.from.piece === piece);

            return (
                <ChessPiece 
                    store={store}
                    piece={piece} 
                    dnd={dnd} 
                    selected={selected}
                    allowMove={canMove(coord)} 
                    square={coord} 
                />
            );
        }
    }

    private onClick? = (e: React.MouseEvent<HTMLDivElement>) => {
        const { store, coord, piece } = this.props;
        e.stopPropagation();
        e.preventDefault();
        store.dispatch({type: boardActions.BOARD_CLICK, square: coord, piece: piece } as BoardAction);
    }

    render() {
        const { legal, coord, piece, selection } = this.props;
        const { connectDropTarget, isOver, canDrop, } = this.props as any;
        
        let { color, name } = this.props;
        color = color || Square.color(coord);
        name = name || Square.squareName(coord);
        
        let classNames: string[] = [];

        if (isOver && canDrop) {
            classNames.push("square-from-to");
        } else if (!isOver && canDrop && legal) {
            classNames.push("square-can-move-to");
        } else {
            if (selection && (selection.from.square !== Square.NullSquare) && (selection.from.square === coord)) {
                classNames.push("square-from-to");
            }

            if (selection && selection.to && (selection.to.square !== Square.NullSquare) && (selection.to.square === coord)) {
                classNames.push("square-from-to");
            }

            if (selection && selection.lastFrom && (selection.lastFrom.square !== Square.NullSquare) && (selection.lastFrom.square === coord)) {
                classNames.push("square-last-from-to");
            }

            if (selection && selection.lastTo && (selection.lastTo.square !== Square.NullSquare) && (selection.lastTo.square === coord)) {
                classNames.push("square-last-from-to");
            }
        }

        return (
            <DumbSquare name={name} 
                color={color} 
                classNames={classNames}
                ref={instance => connectDropTarget(ReactDOM.findDOMNode(instance))}
                onClick={this.onClick}>
                {this.renderPiece()}
            </DumbSquare>
        );
    }
}
