import {Component} from '@angular/core';
import {CacheService} from '../cache.service';
import {Duration, formatDuration} from 'date-fns';

@Component({
    selector: 'app-cache-settings',
    standalone: true,
    templateUrl: './cache-settings.component.html'
})
export class CacheSettingsComponent {
    formattedCurrentCacheDuration: string = formatDuration(this.cacheService.cacheDuration);
    durationChoices: { text: string, value: Duration }[] = [
        {text: '5 seconds', value: {seconds: 5}},
        {text: '10 seconds', value: {seconds: 10}},
        {text: '30 seconds', value: {seconds: 30}},
        {text: '1 minute', value: {minutes: 1}},
        {text: '2 minutes', value: {minutes: 2}},
        {text: '5 minutes', value: {minutes: 5}},
        {text: '1 hour', value: {hours: 1}},
        {text: '2 hours (default)', value: {hours: 2}},
    ];

    constructor(private cacheService: CacheService) {
    }

    updateCacheDuration(duration: Duration) {
        this.cacheService.cacheDuration = duration;
        this.formattedCurrentCacheDuration = formatDuration(duration);
    }

    clearCache() {
        this.cacheService.deleteAll()
    }
}
