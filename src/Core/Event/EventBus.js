const { EventEmitter } = require('fbemitter');

export default class EventBus {
    eventEmitter = new EventEmitter();
  /**
  * Initiate the EventBus
  */
    constructor() {
      this.eventEmitter = new EventEmitter();
    }
  /**
  * Adds the @callback function to the end of the callbacks array
  * for the event named @eventName
  * Will ensure that only one time the callback added for the event
  *
  * @param {string} eventName
  * @param {function} callback
  */
    subscribeOn(eventName, callback) {
      this.eventEmitter.addListener(eventName, (...args) => {
        alert(...args);
      });
    }
  /**
  * Will temove the specified @callback from @eventname list
  *
  * @param {string} eventName
  * @param {function} callback
  */
    unsubscribe(eventName) {
      this.eventEmitter.removeAllListeners(eventName);
    }
  /**
  * Will emit the event on the evetn name with the @payload
  * and if its an error set the @error value
  *
  * @param {string} event
  * @param {object} payload
  * @param {boolean} error
  */
    post(event, payload, error = false) {
      this.eventEmitter.emit(event, payload); // 10 is logged
    }
  /**
  * Returns the event emitter
  * Used for testing purpose and avoid using this during development
  */
    getInstance() {
      return this.eventEmitter;
    }
}
