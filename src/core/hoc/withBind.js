export default class Binder {
  static bind(...fn) {
    // eslint-disable-next-line no-param-reassign
    fn.forEach(f => f = f.bind(this));
  }

  static bindMap(...fn) {
    fn.map(f => f.bind(this));
  }
}
