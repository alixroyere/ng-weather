import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './main-page/zipcode-entry/zipcode-entry.component';
import {LocationService} from './common/location.service';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {WeatherService} from './common/weather.service';
import {CurrentConditionsComponent} from './main-page/current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {TabGroupComponent} from './common/tab/tab-group/tab-group.component';
import {TabComponent} from './common/tab/tab/tab.component';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        ForecastsListComponent,
        CurrentConditionsComponent,
        MainPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        TabGroupComponent,
        TabComponent
    ],
    providers: [LocationService, WeatherService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
