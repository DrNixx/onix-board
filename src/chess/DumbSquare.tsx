import * as React from 'react';
import { Color, Square } from 'onix-chess';

export interface DumbSquareProps {
    color: number,
    name: string,
    classNames: string[],
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void,
}

export interface DumbSquareState {
    style: any;
}

export class DumbSquare extends React.Component<DumbSquareProps, DumbSquareState> {
    /**
     * constructor
     */
    constructor(props: DumbSquareProps) {
        super(props);
        const bx = Math.floor(Math.random() * 50);
        const by = Math.floor(Math.random() * 50);
        const bpos = "-" + bx.toString() + "px -" + by.toString() + "px";
        const style = 
        {
            backgroundPosition: bpos
        };

        this.state = {
            style: style
        }
    }

    protected classNames(): string {
        const { color, classNames } = this.props;
        var cssClass = ["square", Color.Names[color]];

        if (classNames && classNames.length > 0) {
            cssClass = cssClass.concat(cssClass, classNames);
        }

        return cssClass.join(" ");
    }

    render() {
        const { name, onClick } = this.props;

        return (
            <div className={this.classNames()} key={name} onClick={onClick}>
                <div className="sframe" style={this.state.style}>
                    <div className="sborder"></div>
                    <div className="phelper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
