export default class Vec2 {
  public x: number
  public y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  static add(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x + b.x, a.y + b.y)
  }

  static sub(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x - b.x, a.y - b.y)
  }

  static mult(a: Vec2, n: number): Vec2 {
    return new Vec2(a.x * n, a.y * n)
  }

  static div(a: Vec2, n: number): Vec2 {
    return new Vec2(a.x / n, a.y / n)
  }

  public add(v: Vec2): Vec2 {
    this.x += v.x
    this.y += v.y
    return this
  }

  public sub(v: Vec2): Vec2 {
    this.x -= v.x
    this.y -= v.y
    return this
  }
}
