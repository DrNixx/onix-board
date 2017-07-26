import { Intl as IntlCore } from 'onix-core';
import { registerStrings as IntlChess } from 'onix-chess';

var intlInitialized = false;

export function registerStrings() {
    if (!intlInitialized) {
        
        IntlChess();

        IntlCore.registerStrings('chess', {
            'ru-ru': {
                size: "Размер",
                timer_lessone: "менее 1",
                timer_empty: "---",
                timer_nolabel: ["", "", "", ""],
                timer_days: ["дн.", "день", "дня", "дней"],
                timer_hours: ["ч.", "час", "часа", "часов"],
                timer_minutes: ["мин.", "минута", "минуты", "минут"],
                timer_seconds: ["сек.", "секунда", "секунды", "секунд"]
            },

            'en-us': {
                size: "Size",
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
