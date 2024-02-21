import {Injectable} from '@angular/core';
import {add, Duration, isBefore} from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    cacheDuration: Duration = {hours: 2, minutes: 0, seconds: 0};

    retrieve(key: string): any {
        const cachedItemString = localStorage.getItem(key);
        // no cache for this key
        if (!cachedItemString) {
            return null;
        }
        const cache = JSON.parse(cachedItemString);
        const expirationDate: Date = cache[0];
        const cachedData: any = cache[1];

        // expired cache for this key
        if (isBefore(expirationDate, new Date())) {
            localStorage.removeItem(key);
            return null;
        }

        // cache available
        return cachedData;
    }

    set(key: string, value: any): void {
        const expirationDate = add(new Date(), this.cacheDuration);
        localStorage.setItem(key, JSON.stringify([expirationDate, value]));
    }

    deleteAll(): void {
        localStorage.clear();
    }
}
