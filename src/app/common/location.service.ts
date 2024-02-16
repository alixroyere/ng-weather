import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export const LOCATIONS = 'locations';

@Injectable()
export class LocationService {

    private locations: WritableSignal<Set<string>> = signal(new Set());
    private removedLocation: Subject<string> = new Subject<string>();
    private addedLocation: Subject<string> = new Subject<string>();

    constructor() {
        const locString = localStorage.getItem(LOCATIONS);
        if (locString) {
            const locArray: string[] = JSON.parse(locString);
            this.locations.set(new Set(locArray));
        }
    }

    getLocations(): Signal<Set<string>> {
        return this.locations.asReadonly();
    }

    getAddedLocation(): Observable<string> {
        // not using signal as if we add and remove many times the same zip code, we wouldn't be notified
        return this.addedLocation.asObservable();
    }

    getRemovedLocation(): Observable<string> {
        // not using signal as if we add and remove many times the same zip code, we wouldn't be notified
        return this.removedLocation.asObservable();
    }

    addLocation(zipcode: string) {
        const previousSize = this.locations().size;
        this.locations.update(locations => {
            locations.add(zipcode);
            return locations;
        });
        const newSize = this.locations().size;
        if (previousSize !== newSize) {
            this.updateCache();
            this.addedLocation.next(zipcode);
        }
    }

    removeLocation(zipcode: string) {
        const previousSize = this.locations().size;
        this.locations.update(locations => {
            locations.delete(zipcode);
            return locations
        });
        const newSize = this.locations().size;
        if (previousSize !== newSize) {
            this.updateCache();
            this.removedLocation.next(zipcode);
        }
    }

    private updateCache(): void {
        localStorage.setItem(LOCATIONS, JSON.stringify(Array.from(this.locations())));
    }
}
