export class Grid{
    constructor(private width: number, private height: number, private obstacles : [number, number][]= []){}

    isWithinRange( x: number, y:number): boolean{
        return x>=0 && y>=0 && x < this.width && y < this.height
    }

    isObsatcle(x:number, y:number): boolean{
        return this.obstacles.some(([a,b])=> a === x && b === y)
    }
}

