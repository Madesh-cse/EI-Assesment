import type { Direction } from "./Direction";
import { East } from "./East";
import { West } from "./West";

export class North implements Direction {
   move(x: number, y: number): [number, number] {
    return [x, y + 1];
  }
  left(): Direction {
    return new West();
  }
  right(): Direction {
    return new East();
  }
  toString(): string {
    return "North";
  }
}

module.exports = {North}