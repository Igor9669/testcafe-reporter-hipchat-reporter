require('dotenv').load();
const axios = require('axios');

export default function () {

    return {
        noColors: true,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;
            this.messages = [];
            let message = process.env.START_MESSAGE ? process.env.START_MESSAGE : '';
            
            message += `\nTests runned in: ${userAgents}.\nTotal tests: ${this.testCount}`;

            this.messages.push(message);
        },

        reportFixtureStart (name) {
            this.currentFixtureName = name;
            const message = `\nFixture: ${name}\n`;

            this.messages.push(message);
        },

        _renderErrors (errs) {
            const _this2 = this;
            let message = '';

            errs.forEach(function (err, idx) {
                var prefix = _this2.chalk.red(idx + 1 + ') ');

                message += `\n${_this2.formatError(err, prefix)}\n\n`;
            });
            this.messages.push(message);
        },


        reportTestDone (name, testRunInfo ) {
            
            const hasErr = !!testRunInfo.errs.length;
            const result = hasErr ? `(failed)` : `(successful)`;
            const message = `${result} ${name}`;

            this.messages.push(message);

            if (hasErr) this._renderErrors(testRunInfo.errs);
        },

        reportTaskDone (endTime, passed) {
            const durationMs = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');
            const isPassed = passed === this.testCount;
            let message = isPassed ?
                `${this.testCount} passed` :
                `${this.testCount - passed}/${this.testCount} failed`;

            message += ` (Duration: ${durationStr})\n`;
            message =  `\nTest results: ${isPassed ? `(successful) - SUCCESS` : `(failed) - FAILURE`}\n${message}`;

            this.messages.push(message);
            this.postMesage();
        },

        getRequestData () {
            const data = {
                message: this.messages.join('\n'),
                'message_format': 'text'
            };

            const url = process.env.BASE_URL + `/${process.env.ROOM_ID}/notification`;

            return {
                method: 'POST',
                url: url,
                data: JSON.stringify(data),
                headers: {
                    'Authorization': 'Bearer ' + process.env.AUTH_TOKEN,
                    'Content-Type': 'application/json'
                }
            };
        },

        postMesage () {
            const requestData = this.getRequestData();

            axios(requestData)
            .then(() => {
                console.log('Message sent to the HipChat room.');
            })
            .catch((err) => {
                console.log('Problem with sending the message to the HipChat room.');
                console.log(err);
            });
        }
    };
}
