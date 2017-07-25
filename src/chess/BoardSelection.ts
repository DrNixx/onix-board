
export interface BoardSelection {
    square: number;
    piece?: number;
}

export interface BoardMovement {
    from: BoardSelection,
    to?: BoardSelection,
    lastFrom?: BoardSelection,
    lastTo?: BoardSelection,
    canFrom?: BoardSelection,
    canTo?: BoardSelection
}