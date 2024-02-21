import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {ZipcodeEntryComponent} from './main-page/zipcode-entry/zipcode-entry.component';
import {ForecastsListComponent} from './forecasts-list/forecasts-list.component';
import {CurrentConditionsComponent} from './main-page/current-conditions/current-conditions.component';
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {routing} from './app.routing';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {TabGroupComponent} from './common/tab/tab-group/tab-group.component';
import {TabComponent} from './common/tab/tab/tab.component';
import {cachingInterceptor} from './common/cache/caching.interceptor';
import {CacheSettingsComponent} from './common/cache/cache-settings/cache-settings.component';

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
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        TabGroupComponent,
        TabComponent,
        CacheSettingsComponent
    ],
    providers: [
        provideHttpClient(
            withInterceptors([cachingInterceptor]),
        )],
    bootstrap: [AppComponent]
})
export class AppModule {
}
