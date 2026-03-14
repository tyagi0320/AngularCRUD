import { ApplicationConfig, inject, InjectionToken, PLATFORM_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';


export const LOCAL_STORAGE=new InjectionToken<Storage | null>('LOCAL_STORAGE')

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),
    {
      provide: LOCAL_STORAGE,
      useFactory:()=> (isPlatformBrowser(inject(PLATFORM_ID))? window.localStorage : null)

    }
  ]
};
