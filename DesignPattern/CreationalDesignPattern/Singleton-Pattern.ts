interface CacheItem {
  value: any;
  expiry?: number | undefined;
}

class CacheMangement {
  private static instance: CacheMangement;
  private cache: Map<string, CacheItem> = new Map();

  private constructor() {}

  public static getInstance(): CacheMangement {
    if (!CacheMangement.instance) {
      CacheMangement.instance = new CacheMangement();
      console.log("Cachement is initilized");
    }
    return CacheMangement.instance;
  }

  public set(key: string, value: any, ttlInSeconds?: number) {
    const expiry = ttlInSeconds ? Date.now() + ttlInSeconds * 1000 : undefined;
    this.cache.set(key, { value, expiry });
    console.log(`Cache set: ${key}`);
  }

  public get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      console.log(`Cache expired: ${key}`);
      return null;
    }

    return item.value;
  }

  public delete(key: string) {
    this.cache.delete(key);
    console.log(`Cache deleted: ${key}`);
  }

  public clear() {
    this.cache.clear();
    console.log("Cache cleared");
  }
}


const cache1 = CacheMangement.getInstance();
const cache2 = CacheMangement.getInstance();

console.log(cache1 === cache2);

// Time to live is  5 second
cache1.set("user1", { name: "Madesh", age: 25 }, 5); 
cache1.set("user2", { name: "Naveen", age: 30 });

console.log("Get user1:", cache2.get("user1"));

// After 6 second it will get expired
setTimeout(() => {
  console.log("After 6 seconds, user1:", cache1.get("user1"));
}, 6000);

console.log("Get user2:", cache1.get("user2"));