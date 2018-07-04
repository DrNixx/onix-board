import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChessBoard } from '../chess/ChessBoard';

export const ChessBoardTest = (props, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ChessBoard, props), container, () => {});
};
