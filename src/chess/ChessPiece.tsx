import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DragSource, DragSourceSpec, DragSourceConnector, DragSourceMonitor, ConnectDragSource } from 'react-dnd';
import { BoardRelatedStore } from './BoardState';
import { DumbPiece } from './DumbPiece';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { BoardAction } from './BoardActions';
import * as boardActions from './BoardActionConsts';

export interface PieceProps {
    store: BoardRelatedStore,
    piece: number,
    square: number,
    allowMove: boolean,
    selected: boolean,
    dnd: boolean,
    connectDragSource?: ConnectDragSource;
    isDragging?: boolean;
}

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
      isDragging: monitor.isDragging(),
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview()
    };
}

export interface DragPiece {
    from: number,
    piece: number,
}

export const pieceSource: DragSourceSpec<PieceProps, DragPiece> = {
    canDrag(props) {
        return props.dnd && props.allowMove;
    },

    beginDrag(props) {
        return {
            from: props.square,
            piece: props.piece
        };
    },
}

@DragSource("DND_TYPES.PIECE", pieceSource, collect)
export class ChessPiece extends React.Component<PieceProps, {}> {
    /**
     * constructor
     */
    constructor(props: PieceProps, context?: any) {
        super(props, context);
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
        const { connectDragSource, piece, isDragging, selected } = this.props;
        return (
            <DumbPiece 
                piece={piece}
                isDragging={isDragging}
                selected={selected}
                onClick={this.onClick}
                ref={instance => connectDragSource(ReactDOM.findDOMNode(instance))}
            />
        );
    }
}
