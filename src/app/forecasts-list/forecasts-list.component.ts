import {Component} from '@angular/core';
import {WeatherService} from '../common/weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import {pluck, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
    forecast$: Observable<Forecast>;

    constructor(protected weatherService: WeatherService, route: ActivatedRoute) {
        this.forecast$ = route.params.pipe(
            pluck('zipcode'),
            switchMap((zipcode) => weatherService.getForecast(zipcode)),
        );
    }
}
