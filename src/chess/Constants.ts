
export const ImageSize: number[] = [20, 20, 30, 40, 50, 60, 80];
export const BoardSizeClass: string[] = ["size1", "size1", "size2", "size3", "size4", "size5", "size6"];

/**
 * Размеры доски
 */
export enum BoardSize {
    None = 0,
    Tiny = 1,
    Small = 2,
    Smallest = 3,
    Normal = 4,
    Largest = 5,
    Large = 6
}

/**
 * Режимы работы доски
 */
export enum BoardMode {
    Setup = 0,
    Static = 1,
    Pgn = 2,
    Exam = 3,
    Observe = 4,
    Analyze = 5,
    Play = 6
}

export enum Orientation {
    Vertical = 0,
    Horizontal = 1
}