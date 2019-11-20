import { Store } from 'redux';
import { BoardAction } from './BoardActions';
import { State as CgState} from 'chessground/state';
import { BoardSize } from './Constants';

export interface BoardState extends CgState {
    size: BoardSize,
    piece?: string,
    square?: string,
    markers?: string,
}

export interface BoardRelatedState {
    board: BoardState,
}

export type BoardRelatedStore = Store<BoardRelatedState, BoardAction>;
