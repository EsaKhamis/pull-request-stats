const sendError = require('./sendError');
const sendStart = require('./sendStart');
const sendSuccess = require('./sendSuccess');
const buildTracker = require('./buildTracker');

class Telemetry {
  constructor({ core, isSponsor, telemetry }) {
    this.useTelemetry = false;
    this.tracker = this.useTelemetry ? buildTracker() : null;
    if (!this.useTelemetry) core.debug('Telemetry disabled correctly');
    if (!telemetry && !isSponsor) core.error('Disabling telemetry is a premium feature, available to sponsors.');
  }

  start(params) {
    if (!this.useTelemetry) return;
    this.startDate = new Date();
    sendStart({
      ...params,
      tracker: this.tracker,
    });
  }

  error(error) {
    if (!this.useTelemetry) return;
    sendError({
      error,
      tracker: this.tracker,
    });
  }

  success() {
    if (!this.useTelemetry) return;
    sendSuccess({
      timeMs: new Date() - this.startDate,
      tracker: this.tracker,
    });
  }
}

module.exports = Telemetry;
