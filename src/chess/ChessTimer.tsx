import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { formatTimestamp } from 'onix-core';
import { Intl as IntlBoard } from '../Intl';

interface ChessTimerProps {
    time: number,
    active: boolean
}

interface ChessTimerState {
    remain: number;
}

const secondsInDay = 86400;
const longInterval = 1000;
const shortInterval = 100;

export class ChessTimer extends React.Component<ChessTimerProps, ChessTimerState> {
    private timer: NodeJS.Timer;
    private start: number  = Date.now();
    private interval: number;
    /**
     * constructor
     */
    constructor(props: ChessTimerProps) {
        super(props);

        IntlBoard.register();

        const { time } = this.props;

        this.interval = (time < secondsInDay) ? shortInterval : longInterval;
        this.state = {
            remain: time
        }
    }

    componentDidMount() {
        if (this.props.active) {
            this.timer = setInterval(this.tick, this.interval);
        }
        
    }

    componentWillUnmount() {
        if (this.props.active) {
            clearInterval(this.timer);
        }
    }

    private tick = () => {
        const { time } = this.props;
        const elapsed: number = (Date.now() - this.start);
        const remain = time - Math.round(elapsed / 1000);

        this.setState({remain: remain});

        if ((remain < secondsInDay) && (this.interval > shortInterval)) {
            this.interval = shortInterval;
            clearInterval(this.timer);            
            this.timer = setInterval(this.tick, this.interval);
        }
    }

    render() {
        const { active } = this.props;
        const { remain } = this.state;

        let className = active ? "k-state-active" : "";
        const strtime = formatTimestamp(remain * 100);
        
        
        return <span className={className}>{strtime}</span>;
    }
}

export const Timer = (props: ChessTimerProps, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ChessTimer, props), container);
};