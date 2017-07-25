import * as React from 'react';
import { DragLayer } from 'react-dnd';
import { DragPiece } from './DragPiece';
import { BoardSize, BoardSizeClass } from './Constants';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

function getItemStyles(props) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none'
        };
    }

    let { x, y } = currentOffset;

    /*
    if (props.snapToGrid) {
        x -= initialOffset.x;
        y -= initialOffset.y;
        [x, y] = snapToGrid(x, y);
        x += initialOffset.x;
        y += initialOffset.y;
    }
    */

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform: transform,
        WebkitTransform: transform,
    };
}

interface ChessDragLayerProps {
    size?: BoardSize;
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export class ChessDragLayer extends React.Component<ChessDragLayerProps, any> {
    /**
     * constructor
     */
    constructor(props: ChessDragLayerProps) {
        super(props);
    }

    renderItem? = (type, item) => {
        switch (type) {
            case "DND_TYPES.PIECE":
                return (
                    <DragPiece piece={item.piece} />
                );
            default:
                return null;
        }
    }
    
    render() {
        const { size, item, itemType, isDragging } = this.props as any;

        if (!isDragging) {
            return null;
        }

        const sizeClass = BoardSizeClass[size]

        return (
            <div style={layerStyles}>
                <div className={sizeClass} style={getItemStyles(this.props)}>
                    {this.renderItem(itemType, item)}
                </div>
            </div>
        );
    }
}
