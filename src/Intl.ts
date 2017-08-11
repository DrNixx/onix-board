import { Intl as IntlCore } from 'onix-core';
import { Intl as IntlChess } from 'onix-chess';

export class Intl {
    private static intlInitialized = false;

    public static register() {
        if (!Intl.intlInitialized) {
            
            IntlCore.register();
            IntlChess.register();

            IntlCore.registerStrings('chess', {
                'ru-ru': {
                    size: "Размер",
                },

                'en-us': {
                    size: "Size",
                }
            });

            Intl.intlInitialized = true;
        }
    }

}

