import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CurrencyConverterComponent} from './currency-converter/currency-converter.component';

@Component({
  selector: 'app-root',
  imports: [CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'currency-converter';
  currencyData = {
    updatedAt: this.getRandomDate(),
    rates: [
      {
        base: { key: 'EUR', label: 'Euro' },
        target: { key: 'USD', label: 'US Dollar' },
        baseToTargetRate: 1.0766,
      },
      {
        base: { key: 'EUR', label: 'Euro' },
        target: { key: 'CHF', label: 'Swiss Franc' },
        baseToTargetRate: 0.9769,
      },
      {
        base: { key: 'EUR', label: 'Euro' },
        target: { key: 'GBP', label: 'British Pound' },
        baseToTargetRate: 0.8583,
      },
      {
        base: { key: 'USD', label: 'US Dollar' },
        target: { key: 'JPY', label: 'Japanese Yen' },
        baseToTargetRate: 154.527,
      },
      {
        base: { key: 'CHF', label: 'Swiss Franc' },
        target: { key: 'USD', label: 'US Dollar' },
        baseToTargetRate: 1.1021,
      },
      {
        base: { key: 'GBP', label: 'British Pound' },
        target: { key: 'CAD', label: 'Canadian Dollar' },
        baseToTargetRate: 1.7162,
      },
    ],
  };
  private getRandomDate() {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const randomTime = twoHoursAgo.getTime() + Math.random() * (now.getTime() - twoHoursAgo.getTime());
    return new Date(randomTime);
  }
}
