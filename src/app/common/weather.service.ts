import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CurrentConditions} from '../main-page/current-conditions/current-conditions.type';
import {ConditionsAndZip} from './conditions-and-zip.type';
import {Forecast} from '../forecasts-list/forecast.type';
import {LocationService} from './location.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class WeatherService {

    static URL = 'http://api.openweathermap.org/data/2.5';
    static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
    static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
    private currentConditionsAndZip: WritableSignal<ConditionsAndZip[]> = signal([]);

    constructor(private locationService: LocationService, private http: HttpClient) {
        this.locationService.getLocations()().forEach(zip => this.addCurrentCondition(zip));
        /*
           I'm not handling subscriptions as this service is provided only 1 time and in AppModule.
           Thus, the service is not destroyed until we leave the app, which will clean everything
        */
        this.locationService.getAddedLocation().pipe(tap(zip => this.addCurrentCondition(zip))).subscribe();
        this.locationService.getRemovedLocation().pipe(tap(zip => this.removeCurrentConditions(zip))).subscribe();
    }

    addCurrentCondition(zipcode: string): void {
        this.http.get<CurrentConditions>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
            .subscribe(data => this.currentConditionsAndZip.update(conditions => [...conditions, {zip: zipcode, data}]));
    }

    removeCurrentConditions(zipcode: string) {
        this.currentConditionsAndZip.update(conditions =>
            conditions.filter(condition => condition.zip !== zipcode)
        )
    }

    getCurrentConditions(): Signal<ConditionsAndZip[]> {
        return this.currentConditionsAndZip.asReadonly();
    }

    getForecast(zipcode: string): Observable<Forecast> {
        // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
        return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

    }

    getWeatherIcon(id: number): string {
        if (id >= 200 && id <= 232) {
            return WeatherService.ICON_URL + 'art_storm.png';
        } else if (id >= 501 && id <= 511) {
            return WeatherService.ICON_URL + 'art_rain.png';
        } else if (id === 500 || (id >= 520 && id <= 531)) {
            return WeatherService.ICON_URL + 'art_light_rain.png';
        } else if (id >= 600 && id <= 622) {
            return WeatherService.ICON_URL + 'art_snow.png';
        } else if (id >= 801 && id <= 804) {
            return WeatherService.ICON_URL + 'art_clouds.png';
        } else if (id === 741 || id === 761) {
            return WeatherService.ICON_URL + 'art_fog.png';
        } else {
            return WeatherService.ICON_URL + 'art_clear.png';
        }
    }

}
