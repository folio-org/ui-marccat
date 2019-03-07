export default class Binder {
  static bind(...fn) {
    fn.forEach(f => f === f.bind(this));
  }
}
