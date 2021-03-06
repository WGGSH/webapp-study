export default class SolitaireCard {
  public number: number; // 1-13
  public mark: number; // 0-3
  public isFront: boolean
  public isNull: boolean
  public isSelect: boolean

  constructor(number: number, mark: number, isFront: boolean, isNull = false, isSelect = false) {
    this.number = number
    this.mark = mark
    this.isFront = isFront
    this.isNull = isNull
    this.isSelect = isSelect
  }
}
