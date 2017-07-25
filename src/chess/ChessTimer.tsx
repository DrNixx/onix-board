import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Intl } from '../Intl';

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

    format(timeval) {
        if (isNaN(timeval)) {
            return Intl.t("chess", "timer_empty");
        }

        var pad = function (n, c) {
            if ((n = n + "").length < c) {
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };

        var numWithLabel = function (n: number, label: string[], padlen: number, small: boolean, less: boolean, delimeter: string) {
            if (n > 0) {
                if (small) {
                    return "" + pad(n, padlen) + delimeter + label[0];
                }

                if ((n > 10) && (n < 20)) {
                    return "" + pad(n, padlen) + delimeter + label[3];
                }

                var d = n % 10;
                if (d == 1) {
                    return "" + pad(n, padlen) + delimeter + label[1];
                } else if ((d < 5) && (d != 0)) {
                    return "" + pad(n, padlen) + delimeter + label[2];
                } else {
                    return "" + pad(n, padlen) + delimeter + label[3];
                }
            } else {
                if (less) {
                    return Intl.t("chess", "timer_lessone") + " " + label[2];
                } else {
                    return Intl.t("chess", "timer_empty");;
                }
            }
        };

        var dayWithLabel = function (d, small, less) {
            return numWithLabel(d, Intl.ts("chess", "timer_days"), 0, small, less, " ");
        };

        var hourWithLabel = function (d, small, less) {
            return numWithLabel(d, Intl.ts("chess", "timer_hours"), 0, small, less, " ");
        };

        var minuteWithLabel = function (d, small, less) {
            return numWithLabel(d, Intl.ts("chess", "timer_minutes"), 0, small, less, " ");
        };

        var secondWithLabel = function (d, small, less) {
            return numWithLabel(d, Intl.ts("chess", "timer_seconds"), 0, small, less, " ");
        };

        if (timeval < 0) timeval = 0;
        var dday = Math.floor(timeval / 86400); timeval -= dday * 86400;
        var dhour = Math.floor(timeval / 3600); timeval -= dhour * 3600;
        var dmin = Math.floor(timeval / 60); timeval -= dmin * 60;
        var dsec = timeval;
        var result = "";
        if ((dday == 0) && (dhour == 0) && (dmin == 0) && (dsec == 0)) {
            result = "-";
        } else {
            if (dday > 0) {
                result = dayWithLabel(dday, false, false);
                if (dhour > 0) {
                    result += " " + hourWithLabel(dhour, false, false);
                }
            } else {
                result += pad(dhour, 2) + ":" + pad(dmin, 2) + ":" + pad(dsec, 2);
            }
        }

        return result;
    }

    render() {
        const { active } = this.props;
        const { remain } = this.state;

        let className = active ? "k-state-active" : "";
        const strtime = this.format(remain);
        
        
        return <span className={className}>{strtime}</span>;
    }
}

export const Timer = (props: ChessTimerProps, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ChessTimer, props), container);
};