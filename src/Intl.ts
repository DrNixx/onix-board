import { Intl as IntlCore } from 'onix-core';

var intlInitialized = false;

export function registerStrings() {
    if (!intlInitialized) {
        
        IntlCore.registerStrings('builder', {
            'ru-ru': {
                fen: "FEN",
                size: "Размер",
                pieces: "Фигуры",
                squares: "Доска",
                who_move: "Очередь хода",
                white: "Белые",
                black: "Черные",
                white_move: "Ход белых",
                black_move: "Ход черных",
                move_no: "№ хода",
                ep_target: "e.p.",
                castle: "Рокировка",
                firstMove: "Первый ход",
                prevMove: "Предыдущий ход",
                nextMove: "Следующий ход",
                lastMove: "Последний ход",
                timer_lessone: "менее 1",
                timer_empty: "---",
                timer_nolabel: ["", "", "", ""],
                timer_days: ["дн.", "день", "дня", "дней"],
                timer_hours: ["ч.", "час", "часа", "часов"],
                timer_minutes: ["мин.", "минута", "минуты", "минут"],
                timer_seconds: ["сек.", "секунда", "секунды", "секунд"]
            },

            'en-us': {
                fen: "FEN",
                size: "Size",
                pieces: "Pieces",
                squares: "Board",
                who_move: "Who move",
                white: "White",
                black: "Black",
                white_move: "White move",
                black_move: "Black move",
                move_no: "Move no",
                ep_target: "e.p.",
                castle: "Castle",
                firstMove: "First move",
                prevMove: " Prev move",
                nextMove: "Next move",
                lastMove: "Last move",
                timer_lessone: "less 1",
                timer_empty: "---",
                timer_nolabel: ["", "", "", ""],
                timer_days: ["d.", "day", "days", "days"],
                timer_hours: ["h.", "hour", "hours", "hours"],
                timer_minutes: ["m.", "minute", "minutes", "minutes"],
                timer_seconds: ["sec.", "second", "seconds", "seconds"]
            }
        });

        intlInitialized = true;
    }
}
