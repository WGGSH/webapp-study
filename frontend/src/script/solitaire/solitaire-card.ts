export default class SolitaireCard {
  public number: number; // 1-13
  public mark: number; // 0-3
  public isFront: boolean

  constructor(number: number, mark: number, isFront: boolean) {
    this.number = number
    this.mark = mark
    this.isFront = isFront
  }
}
