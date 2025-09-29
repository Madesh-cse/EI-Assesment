export interface Direction {
  move(x: number, y: number): [number, number];
  left(): Direction;
  right(): Direction;
  toString(): string;
}