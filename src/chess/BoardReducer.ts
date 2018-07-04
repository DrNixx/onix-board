import isString from 'lodash-es/isString';
import { Reducer } from 'redux';
import { BoardSize } from './Constants';
import { BoardState } from './BoardState';
import { Position, FenStandartStart, FenEmptyBoard, Piece, Square } from 'onix-chess';
import * as actions from './BoardActionConsts';
import { BoardAction } from './BoardActions';
import { Logger } from 'onix-core';

const updateStyle = (id: string, name: string) => {
    let style = document.getElementById(id) as HTMLLinkElement;
    if (!style) {
        style = document.createElement("link");
        style.id = id;
        document.head.appendChild(style);
    }

    var re = /[a-z\-]+(\.min)?\.css/;
    style.href = style.href.replace(re, name + ".min.css");

}

const canMove = (from: number, to: number): boolean => {
    if (typeof to === "undefined") {
        return typeof from !== "undefined";
    }

    // const state: PositionState = this.store.getState();
    return true; // (to == Square.NullSquare) || (state.board.position.getPiece(to) == Piece.NoPiece);
}

const INITIAL_STATE: BoardState = {
    size: BoardSize.Normal,
    piece: "alpha",
    square: "color-brown",
    flip: false,
    coords: true,
    frame: true,
    moveturn: true,
    position: new Position(FenStandartStart),
    fen: FenStandartStart,
    selection: {
        from: {
            piece: Piece.NoPiece,
            square: Square.NullSquare
        }
    },
    canMove: canMove,
    doMove: (from, to, piece) => { return false; }
}

export const boardReducer: Reducer<BoardState> = (state: BoardState = INITIAL_STATE, action: BoardAction) => {
    Logger.debug('Try board action', action);
    switch (action.type) {
        case actions.SET_POSITION:
            return { 
                ...state, 
                position: action.position,
                fen: action.position.writeFEN()
            };

        case actions.SET_FEN:
            state.position.readFromFEN(action.fen);
            return {
                ...state,
                fen: state.position.writeFEN()
            };

        case actions.SET_SELECTION:
            return {
                ...state,
                selection: action.selection
            };

        case actions.SET_CASTLE:
            state.position.setCastling(action.color, action.side, action.flag);
            return {
                ...state,
                fen: state.position.writeFEN()
            };

        case actions.SET_MOVENO:
            state.position.setMoveNo(action.move);
            return {
                ...state,
                fen: state.position.writeFEN()
            };

        case actions.SET_EP:
            state.position.EpTarget = (action.ep_target);
            return {
                ...state,
                fen: state.position.writeFEN()
            };

        case actions.CLEAR_BOARD:
            state.position.readFromFEN(FenEmptyBoard);
            return {
                ...state,
                fen: FenEmptyBoard
            };

        case actions.STD_START:
            state.position.readFromFEN(FenStandartStart);
            return {
                ...state,
                fen: FenStandartStart
            };

        case actions.FLIP_BOARD:
            return {
                ...state,
                flip: action.flag
            };

        case actions.SET_COORDS:
            return {
                ...state,
                coords: action.flag
            };

        case actions.SET_FRAME:
            return {
                ...state,
                frame: action.flag
            };

        case actions.SET_MOVETURN:
            return {
                ...state,
                moveturn: action.flag
            };

        case actions.CHANGE_SIZE:
            return {
                ...state,
                size: action.size
            };

        case actions.SET_PIECE:
            updateStyle("boardPieceSet", action.piece);
            return {
                ...state,
                piece: action.piece
            };

        case actions.SET_SQUARE:
            updateStyle("boardSqueareSet", action.square);
            return {
                ...state,
                square: action.square
            };

        case actions.WHO_MOVE:
            state.position.WhoMove = action.color;
            return {
                ...state,
                fen: state.position.writeFEN()
            };

        case actions.UDPATE_BOARD: {
            return {
                ...state,
                fen: state.position.writeFEN()
            };
        }

        case actions.BOARD_CLICK: {
            let { selection } = state;

            if (selection.from.piece !== Piece.NoPiece) {
                if (selection.from.square === action.square) {
                    let np = (selection.from.piece === action.piece) ? Piece.NoPiece : action.piece;
                    return {
                        ...state,
                        selection: {
                            from: {
                                piece: np,
                                square: Square.NullSquare
                            }
                        }
                    };
                } else {
                    const res = state.doMove(selection.from.square, action.square, selection.from.piece);
                    if (res) {
                        const fen = isString(res) ? <string>res : state.position.writeFEN();
                        const p = (selection.from.square === Square.NullSquare) ? selection.from.piece : Piece.NoPiece;
                        
                        return {
                            ...state,
                            fen: fen,
                            selection: {
                                from: {
                                    piece: p,
                                    square: Square.NullSquare
                                }
                            }
                        };
                    } else {
                        return state;
                    }
                }
            } else {
                if (action.piece !== Piece.NoPiece) {
                    return {
                        ...state,
                        selection: {
                            from: {
                                piece: action.piece,
                                square: action.square
                            }
                        }
                    };
                }
            }

            return state;
        }

        case actions.BOARD_MOVE: {
            let { selection } = state;
            const res = state.doMove(action.from, action.to, action.piece);
            if (res) {
                const fen = isString(res) ? <string>res : state.position.writeFEN();
                const p = (selection.from.square === Square.NullSquare) ? selection.from.piece : Piece.NoPiece;
                
                return {
                    ...state,
                    fen: fen,
                    selection: {
                        from: {
                            piece: p,
                            square: Square.NullSquare
                        }
                    }
                };
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}