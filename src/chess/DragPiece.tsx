import * as React from 'react';
import { DumbPiece } from './DumbPiece';

export interface DragPieceProps {
    piece: number;
}

export class DragPiece extends React.Component<DragPieceProps, any> {
    /**
     * constructor
     */
    constructor(props: DragPieceProps) {
        super(props);
    }

    private onClick = () => {}

    render() {
        return (
            <DumbPiece
                piece={this.props.piece} 
                canMove={true} 
                isDragging={false}
                onClick={this.onClick}
                selected={true}
            />
        );
    }
}