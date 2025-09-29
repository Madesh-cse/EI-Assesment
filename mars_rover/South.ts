import type { Direction } from "./Direction";
import { East } from "./East";
import { West } from "./West";

export class South implements Direction {
  move(x: number, y: number): [number, number] {
    return [x, y - 1];
  }
  left(): Direction {
    return new East();
  }
  right(): Direction {
    return new West();
  }
  toString(): string {
    return "South";
  }
}

module.exports = {South}