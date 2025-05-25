import 'zone.js';
import { createCustomElement } from '@angular/elements';
import { CurrencyConverterComponent } from './app/currency-converter/currency-converter.component';
import { createApplication } from '@angular/platform-browser';

createApplication({
  providers: [],
}).then(appRef => {
  const el = createCustomElement(CurrencyConverterComponent, {
    injector: appRef.injector,
  });
  customElements.define('currency-converter', el);
});
