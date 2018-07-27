import { Store } from 'redux';
import { Position } from 'onix-chess';
import { BoardSettings } from './BoardSettings';
import { BoardMovement } from './BoardSelection';
import { BoardAction } from './BoardActions';

export interface BoardState extends BoardSettings {
    moveturn: boolean,
    position: Position,
    selection: BoardMovement
}

export interface BoardRelatedState {
    board: BoardState,
}

export type BoardRelatedStore = Store<BoardRelatedState, BoardAction>;
