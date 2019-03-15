/* eslint-disable no-continue */
const invariant = require('invariant');

export type Token = string;

const _prefix = 'ID_';

class Dispatcher<Payload> {
  cb: {[key: Token]: (payload: Payload) => void};
  isDispatching: boolean;
  isHandled: {[key: Token]: boolean};
  isPending: {[key: Token]: boolean};
  lastID: number;
  pendingPayload: Payload;

  constructor() {
    this.cb = {};
    this.isDispatching = false;
    this.isHandled = {};
    this.isPending = {};
    this.lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */
  register(callback: (payload: Payload) => void): Token {
    const id = _prefix + this.lastID++;
    this.cb[id] = callback;
    return id;
  }

  /**
   * Removes a callback based on its token.
   */
  unregister(id: Token): void {
    invariant(
      this.cb[id],
      'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
      id
    );
    delete this.cb[id];
  }

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */
  waitFor(ids: Array<Token>): void {
    invariant(
      this.isDispatching,
      'Dispatcher.waitFor(...): Must be invoked while dispatching.'
    );
    for (let ii = 0; ii < ids.length; ii += 1) {
      const id = ids[ii];
      if (this.isPending[id]) {
        invariant(
          this.isHandled[id],
          'Dispatcher.waitFor(...): Circular dependency detected while ' +
          'waiting for `%s`.',
          id
        );
        continue;
      }
      invariant(
        this.cb[id],
        'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
        id
      );
      this.invokeCb(id);
    }
  }

  /**
   * Dispatches a payload to all registered callbacks.
   */
  dispatch(payload: Payload): void {
    invariant(
      !this.isDispatching,
      'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
    );
    this.startDispatching(payload);
    try {
      for (const id in this.cb) {
        if (this.isPending[id]) {
          continue;
        }
        this.invokeCb(id);
      }
    } finally {
      this.stopDispatching();
    }
  }

  /**
   * Is this Dispatcher currently dispatching.
   */
  isDispatching(): boolean {
    return this.isDispatching;
  }

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */
  invokeCb(id: Token): void {
    this.isPending[id] = true;
    this.cb[id](this.pendingPayload);
    this.isHandled[id] = true;
  }

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */
  startDispatching(payload: Payload): void {
    for (const id in this.cb) {
      if (id) {
        this.isPending[id] = false;
        this.isHandled[id] = false;
      }
    }
    this.pendingPayload = payload;
    this.isDispatching = true;
  }

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  stopDispatching(): void {
    delete this.pendingPayload;
    this.isDispatching = false;
  }
}

export default Dispatcher;
