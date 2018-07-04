import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DumbHolder } from './DumbHolder';
import { store } from './PositionStore';
import { Orientation } from '../chess';

export const HolderTest = (container: HTMLElement) => {
    const props = {
        store: store,
        orient: Orientation.Horizontal
    };

    ReactDOM.render(React.createElement(DumbHolder, props), container, () => {});
};
