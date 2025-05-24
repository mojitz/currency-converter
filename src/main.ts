import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
// import { createCustomElement } from '@angular/elements';
// import { EnvironmentInjector, inject } from '@angular/core';
// import { CurrencyConverterComponent } from './app/currency-converter/currency-converter.component';
//
// const injector = inject(EnvironmentInjector);
//
// const element = createCustomElement(CurrencyConverterComponent, { injector });
// customElements.define('currency-converter', element);
