import { BoardSize } from './Constants';
import { Castle } from 'onix-chess';
import { Position } from 'onix-chess';
import * as types from './BoardActionTypes';
import { BoardMovement } from './BoardSelection';



export type SetPositionAction = {
    type: types.SET_POSITION,
    position: Position
};

export type SetFenAction = {
    type: types.SET_FEN,
    fen: string,
    ep_target?: number,
};

export type SetSelectionAction = {
    type: types.SET_SELECTION,
    selection: BoardMovement,
};

export type SetCatleAction = {
    type: types.SET_CASTLE,
    color: number,
    side: Castle,
    flag: boolean
}

export type SetWhoMoveAction = {
    type: types.WHO_MOVE,
    color: number
}

export type SetMoveNoAction = {
    type: types.SET_MOVENO,
    move: number,
}

export type SetEpAction = {
    type: types.SET_EP,
    ep_target: number,
}

export type SetBoardSizeAction = {
    type: types.CHANGE_SIZE,
    size: BoardSize
}

export type SetPieceAction = {
    type: types.SET_PIECE,
    piece: string
}

export type SetSquareAction = {
    type: types.SET_SQUARE,
    square: string
}

export type BoardNoParamAction = {
    type: types.CLEAR_BOARD | types.STD_START | types.UDPATE_BOARD
}

export type BoardFlagAction = {
    type: types.FLIP_BOARD | types.SET_COORDS | types.SET_FRAME | types.SET_MOVETURN,
    flag: boolean
}

export type BoardClickAction = {
    type: types.BOARD_CLICK,
    square: number, 
    piece: number
}

export type BoardMoveAction = {
    type: types.BOARD_MOVE,
    from: number, 
    to: number, 
    piece: number,
}

export type BoardAction = 
    SetPositionAction | 
    SetFenAction | 
    SetSelectionAction |
    SetCatleAction | 
    SetMoveNoAction | 
    SetEpAction | 
    BoardFlagAction | 
    SetBoardSizeAction | 
    SetPieceAction | 
    SetSquareAction | 
    SetWhoMoveAction | 
    BoardNoParamAction | 
    BoardClickAction |
    BoardMoveAction; 