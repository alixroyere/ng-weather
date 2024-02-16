import {Component, inject, Signal} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../conditions-and-zip.type';

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
    protected trackByZip = (_, condition: ConditionsAndZip) => condition.zip;

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode])
    }
}
