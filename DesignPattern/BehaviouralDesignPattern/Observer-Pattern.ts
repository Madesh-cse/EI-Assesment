// 1. Observer Pattern 

// Ride-Sharing App Notifications

interface Driver{
    update(riderName: string, location:string): void
}

// Observer
// Based on the rider location near by driver location is shown
class ObserverDriver implements Driver{
    constructor(public name: string, private city:string, public rating: string){}
    update(riderName: string, location: string): void {
        if(this.city === location ){
            console.log(`Driver ${this.name} [Rating: ${this.rating}] got notification: Rider ${riderName} at ${location}`)
        }
       
    }
}

class Rider{
    public drivers : Driver[] = [];
    constructor(public name: string, public location: string){}

    addDriver(driver:Driver): void{
        this.drivers.push(driver)
    }

    removeDriver(driver: Driver): void{
       this.drivers =  this.drivers.filter((d)=> d !== driver)
    }
    requestDriver(): void{
        console.log(`\n Rider ${this.name} request the driver from ${this.location}`)
        this.notifiDriver()
    }

    private notifiDriver(): void{
        for(const driver of this.drivers){
            driver.update(this.name, this.location)
        }
    }
}

const rider1 = new Rider('Tommy', 'Chennai');
const rider2 = new Rider('Karthik', 'Madurai');
const rider3 = new Rider('Nilesh', 'Trichy')

const driver1 = new ObserverDriver('Madesh', 'Chennai','4');
const driver2 = new ObserverDriver("Pravin", 'Madurai','4.5')
const driver3 = new ObserverDriver("Ramesh", 'Trichy','5')

rider1.addDriver(driver1);
rider2.addDriver(driver2);
rider3.addDriver(driver3);

rider1.requestDriver();
rider2.requestDriver();
rider3.requestDriver();

console.log("\n✅ Driver Madesh accepts the ride");
rider1.removeDriver(driver1);

rider1.requestDriver();
rider3.requestDriver()