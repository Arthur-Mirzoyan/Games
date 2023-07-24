class Stopwatch {
    #interval;
    #stopwatchBlock;

    constructor(stopwatchBlock) {
        this.startTime = {};
        this.#stopwatchBlock = stopwatchBlock;
    }

    start() {
        this.startTime = {
            hour: 0,
            min: 0,
            sec: 0,
            mil: 0
        };

        this.#interval = setInterval(() => {
            this.startTime.mil += 4;
            if (this.startTime.mil == 1000) {
                this.startTime.mil = 0;
                this.startTime.sec++;
            }
            if (this.startTime.sec == 60) {
                this.startTime.sec = 0;
                this.startTime.min++;
            }
            if (this.startTime.min == 60) {
                this.startTime.min = 0;
                this.startTime.hour++;
            }

            let time = `${this.startTime.sec} : ${this.startTime.mil}`;
            if (this.startTime.min) time = `${this.startTime.min} : ${time}`;
            if (this.startTime.hour) time = `${this.startTime.hour} : ${time}`;

            this.#stopwatchBlock.innerText = time;
        })
    }

    stop() {
        clearInterval(this.#interval);
    }
}