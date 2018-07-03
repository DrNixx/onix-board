import { BoardSize } from './Constants';

export interface BoardSettings {
    fen?: string,
    size: BoardSize,
    coords?: boolean,
    frame?: boolean,
    flip?: boolean,
    piece?: string,
    square?: string,
    markers?: string,
}