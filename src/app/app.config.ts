import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions({
      onViewTransitionCreated: ({transition}) => {
        const router = inject(Router);
        const targetUrl = router.getCurrentNavigation()!.finalUrl!;
        // Skip the transition if the only thing 
        // changing is the fragment and queryParams
       
        if (router.isActive(targetUrl, { 
          paths: 'exact', 
          matrixParams: 'exact',
          fragment: 'ignored',
          queryParams: 'ignored',
        })) {
          transition.skipTransition();
        }
      },
     })), provideClientHydration(), provideHttpClient()]
};
