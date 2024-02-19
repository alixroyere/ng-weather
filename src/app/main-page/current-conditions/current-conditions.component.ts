import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../../common/weather.service';
import {LocationService} from '../../common/location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../../common/conditions-and-zip.type';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

    private router = inject(Router);
    protected weatherService = inject(WeatherService);
    protected locationService = inject(LocationService);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode])
    }

    removeLocation(location: ConditionsAndZip): void {
        this.locationService.removeLocation(location.zip);
    }
}
