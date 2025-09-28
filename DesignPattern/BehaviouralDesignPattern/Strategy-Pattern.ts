// Strategy-Pattern
interface TradingStrategy {
    execute(price: number, bot: CryptoBot): void;
}

class AggressiveStrategy implements TradingStrategy {
    execute(price: number, bot: CryptoBot): void {
        console.log(` Aggressive Strategy: Buy more at price ${price}!`);
        bot.checkLossOrProfit(price)
    }
}

class ConservativeStrategy implements TradingStrategy {
    execute(price: number, bot: CryptoBot): void {
        console.log(` Conservative Strategy: Only invest a little at price ${price}.`);
        bot.checkLossOrProfit(price)
    }
}

class BalancedStrategy implements TradingStrategy {
    execute(price: number, bot: CryptoBot): void {
        console.log(` Balanced Strategy: Buy and hold at price ${price}.`);
        bot.checkLossOrProfit(price)
    }
}

class CryptoBot {

    public loss: number = 0;
    public profit: number = 0;

    constructor(public strategy: TradingStrategy) {}

    setStrategy(strategy: TradingStrategy) {
        this.strategy = strategy;
        console.log(`Strategy switched to ${strategy.constructor.name}`);
    }

    trade(price: number) {
        this.strategy.execute(price, this);
    }

    setLoss(price: number){
        this.loss = price  ;
        console.log(`Loss value are set at price of ${price}`)
    }

    setProfit(price:number){
        this.profit = price;
        console.log(`Profit value are set at price of ${price} `)
    }

    checkLossOrProfit(price: number){
        if(this.loss && price <= this.loss){
            console.log(`setLoss is reached sell at ${price}`)
        }
        if(this.profit && price >= this.profit){
              console.log(`setProfit is reached sell at ${price}`)
        }
    }

}

const bot = new CryptoBot(new ConservativeStrategy());

bot.setLoss(48700)
bot.setProfit(51500)

const marketPrices = [50000, 51000, 48700, 52000];

marketPrices.forEach((price) => bot.trade(price));

bot.setStrategy(new AggressiveStrategy());
marketPrices.forEach((price) => bot.trade(price));

bot.setStrategy(new BalancedStrategy());
marketPrices.forEach((price) => bot.trade(price));
