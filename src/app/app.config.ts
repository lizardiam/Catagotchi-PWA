import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom, isDevMode } from '@angular/core';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(), importProvidersFrom(HttpClientModule), provideServiceWorker('ngsw-worker.js', {
        enabled: isDevMode(),   // set to true, because not in production
        registrationStrategy: 'registerWhenStable:30000'  //registers service worker when app is stable OR after 30 seconds
    })]
};
