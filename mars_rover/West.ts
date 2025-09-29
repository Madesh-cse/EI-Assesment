import type { Direction } from "./Direction";
import { South } from "./South";
import { North } from "./North";

export class West implements Direction {
  move(x: number, y: number): [number, number] {
    return [x - 1, y];
  }
  left(): Direction {
    return new South();
  }
  right(): Direction {
    return new North();
  }
  toString(): string {
    return "West";
  }
}

module.exports = {West}