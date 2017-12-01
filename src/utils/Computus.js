/**
 * Created by chao on 2017/9/29.
 */

export default class Computus {

  constructor (props) {
    this.state = {
      power: 0
    };
  }

  static Take (a, b) {
    this.isInt(a);
    this.isInt(b);
    return this.ParseInt(a) * this.ParseInt(b) / this.state.power;
  }

  static Sum (a, b) {
    this.isInt(a);
    this.isInt(b);
    return (this.ParseInt(a) + this.ParseInt(b)) / this.state.power;
  }

  static ParseInt (number) {
    return number * Math.pow(10, this.state.power);
  }

  static GetPower (number) {
    let power = number.toString().indexOf('.');
    if (power > this.state.power) {
      this.state.power = power;
    }
  }

  static isInt (number) {
    if (number === parseInt(number)) {
      this.GetPower(number);
    }
  }
};
