import { Matrix2, deg2rad } from './Math';

export class Switch {
  cases: Array<String>;
  case: String;

  constructor(...cases) {
    if (!cases.length)
      throw new Error('Switch must have at least one case!');
    this.cases = cases;
    this.switch(this.cases[0]);
  }

  switch(Case) {
    if (this.cases.includes(Case)) this.case = Case;
    else
      throw new Error(
        `Case ${Case} doesn't contained in (${this.cases.join(', ')})`,
      );
  }

  *[Symbol.iterator]() {
    for (const Case in this.cases) yield Case;
  }
}

export class EventEmitter {
  events: Object;

  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (typeof this.events[event] !== 'object') {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }
  removeListener(event, listener) {
    if (typeof this.events[event] === 'object') {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  emit(event, ...args) {
    if (typeof this.events[event] === 'object') {
      this.events[event].forEach(listener => listener.apply(this, args));
    }
  }
  once(event, listener) {
    const remove = this.on(event, (...args) => {
      remove();
      listener.apply(this, args);
    });
  }
}

export function random(min: number, max: number): number {
  return Math.floor(Math.random() * max) + min;
}

export function generateRotationMatrix2D(deg: number): Matrix2 {
  const rad = deg2rad(deg);
  // ...[...] is used for rectangular view of the matrix in pretted code =D
  return new Matrix2([
    ...[Math.cos(rad), -Math.sin(rad)],
    ...[Math.sin(rad), Math.cos(rad)],
  ]);
}
