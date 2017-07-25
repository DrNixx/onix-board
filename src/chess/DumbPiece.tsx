import * as React from 'react';
import { Color, Piece } from 'onix-chess';

export interface DumbPieceProps {
    piece: number,
    canMove: boolean,
    isDragging?: boolean,
    selected: boolean,
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}

function getStyles(props) {
  const { isDragging } = props;
  
  return {
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  };
}

export class DumbPiece extends React.Component<DumbPieceProps, {}> {
    /**
     * constructor
     */
    constructor(props: DumbPieceProps) {
        super(props);
    }

    protected classNames(): string {
        var color = Piece.color(this.props.piece);
        var cssClasses = [
            "piece",
            Piece.pieceName(this.props.piece),
            Color.Names[color]
        ];

        if (this.props.selected) {
            cssClasses.push("selected");
        }

        return cssClasses.join(" ");
    }

    render() {
        const { onClick } = this.props;

        return (
            <div className={this.classNames()} style={getStyles(this.props)} onClick={onClick}>
                <div className="pframe">
                    <div className="pshd"></div>
                    <div className="pimg"></div>
                </div>
            </div>
        );
    }
}