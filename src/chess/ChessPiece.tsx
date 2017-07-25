import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DragSource, DragSourceSpec, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import { BoardRelatedStore } from './BoardState';
import { Color, Piece, Square } from 'onix-chess';
import { DumbPiece } from './DumbPiece';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { BoardAction } from './BoardActions';
import * as boardActions from './BoardActionConsts';

export interface PieceProps {
    store: BoardRelatedStore,
    piece: number,
    square: number,
    canMove: boolean,
    selected: boolean,
    dnd: boolean,
}

export const pieceSource: DragSourceSpec<PieceProps> = {
    canDrag(props) {
        return props.dnd && props.canMove;
    },

    beginDrag(props) {
        return {
            from: props.square,
            piece: props.piece
        };
    },
}

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

@DragSource("DND_TYPES.PIECE", pieceSource, collect)
export class ChessPiece extends React.Component<PieceProps, {}> {
    /**
     * constructor
     */
    constructor(props: PieceProps) {
        super(props);
    }

    componentDidMount() {
        const { connectDragPreview } = this.props as any;
        connectDragPreview(getEmptyImage(), { captureDraggingState: true });
    }

    private onClick? = (e: React.MouseEvent<HTMLDivElement>) => {
        const { store, piece, square } = this.props;
        e.stopPropagation();
        e.preventDefault();
        store.dispatch({type: boardActions.BOARD_CLICK, square: square, piece: piece } as BoardAction);
    }

    render() {
        const { connectDragSource, piece, canMove, isDragging, selected } = this.props as any;
        return (
            <DumbPiece 
                piece={piece}
                canMove={canMove} 
                isDragging={isDragging}
                selected={selected}
                onClick={this.onClick}
                ref={instance => connectDragSource(ReactDOM.findDOMNode(instance))}
            />
        );
    }
}
