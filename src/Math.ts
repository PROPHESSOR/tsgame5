import { generateRotationMatrix2D } from './Utils';

export interface Vector {
  constructor: Function;
  map: (
    callback: (value: number, index: number, array: Array<number>) => any,
  ) => Vector;
  toArray: () => Array<number>;
  [Symbol.iterator]: Function;
  plus(vector: Vector | number): Vector;
  minus(vector: Vector | number): Vector;
  multiply(vector: Vector | number): Vector;
  divide(vector: Vector | number): Vector;
}

export interface Matrix {
  constructor: Function;
  values: Array<number>;
  transform: (vector: Vector) => Vector;
}

export class Vec2 implements Vector {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    [this.x, this.y] = [x, y];
  }

  map(
    callback: (value: number, index: number, array: Array<number>) => any,
  ): Vec2 {
    return Vec2.fromArray([this.x, this.y].map(callback));
  }

  toArray(): Array<number> {
    return [this.x, this.y];
  }

  plus(vector: Vec2 | number): Vec2 {
    if (vector instanceof Vec2)
      return new Vec2(this.x + vector.x, this.y + vector.y);
    return this.map(val => val + vector);
  }

  minus(vector: Vec2 | number): Vec2 {
    if (vector instanceof Vec2)
      return new Vec2(this.x - vector.x, this.y - vector.y);
    return this.map(val => val - vector);
  }

  multiply(vector: Vec2 | number): Vec2 {
    if (vector instanceof Vec2)
      return new Vec2(this.x * vector.x, this.y * vector.y);
    return this.map(val => val * vector);
  }

  divide(vector: Vec2 | number): Vec2 {
    if (vector instanceof Vec2) {
      Vec2.notZero(vector);
      return new Vec2(this.x / vector.x, this.y / vector.y);
    }
    if (vector === 0) throw new Error('Divide by zero error!');
    return this.map(val => val / vector);
  }

  /**
   * Rotates current vector to `deg` degrees around the origin (0, 0)
   * @param deg Degrees to rotate
   * @returns {Vec2} new vector
   */
  rotate(deg: number): Vec2 {
    const rotationMatrix = generateRotationMatrix2D(deg);

    return rotationMatrix.transform(this);
  }

  /**
   * Rotates current vector to `deg` degrees around the `point`
   * @param deg Degrees to rotate
   * @param point Point to rotate around it
   */
  rotateAroundThePoint(deg: number, point: Vec2): Vec2 {
    // Move the origin of coordinates to the (0, 0)
    // Rotate around the (0, 0)
    // Move back the origin of coordinates to the point
    return this.minus(point)
      .rotate(deg)
      .plus(point);
  }

  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  static from(vec: Vec2): Vec2 {
    return new Vec2(vec.x, vec.y);
  }

  static fromArray(array: Array<number>): Vec2 {
    return new Vec2(...array);
  }

  static notZero(vec: Vec2) {
    if (vec.x === 0 || vec.y === 0)
      throw new Error(`Vec2 mustn't have zeroes!`);
  }
}

export class Matrix2 implements Matrix {
  values: Array<number>;

  constructor(values: Array<number>) {
    if (values.length !== 4)
      throw new TypeError("Isn't a matrix 2x2 data!");
    this.values = values;
  }

  transform(vector: Vec2): Vec2 {
    return new Vec2(
      vector.x * this.values[0] + vector.y * this.values[2],
      vector.x * this.values[1] + vector.y * this.values[3],
    );
  }
}

export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}
