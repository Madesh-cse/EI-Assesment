import type { Direction } from "./Direction";
import { North } from "./North";
import { South } from "./South";


export class East implements Direction {
  move(x: number, y: number): [number, number] {
    return [x + 1, y];
  }
  left(): Direction {
    return new North();
  }
  right(): Direction {
    return new South();
  }
  toString(): string {
    return "East";
  }
}

module.exports = {East}