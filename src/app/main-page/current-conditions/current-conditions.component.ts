import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../../common/weather.service';
import {LocationService} from '../../common/location.service';
import {ConditionsAndZip} from '../../common/conditions-and-zip.type';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
    protected weatherService = inject(WeatherService);
    protected locationService = inject(LocationService);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    removeLocation(location: ConditionsAndZip): void {
        this.locationService.removeLocation(location.zip);
    }
}
