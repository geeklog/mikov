type Func = () => any;

export default class Sequential {

  private exeQueue: Func[] = [];
  private fn ?: Func;

  go(fn: Func) {
    this.exeQueue.push(fn);
    this._next();
  }

  async _next() {
    if (this.fn) {
      return;
    }
    while (this.fn = this.exeQueue.shift()) {
      await this.fn();
    }
    this.fn = undefined;
  }

}
