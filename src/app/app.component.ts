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
      {
        base: { key: 'USD', label: 'US Dollar' },
        target: { key: 'EUR', label: 'Euro' },
        baseToTargetRate: 0.9289
      },
      {
        base: { key: 'CHF', label: 'Swiss Franc' },
        target: { key: 'EUR', label: 'Euro' },
        baseToTargetRate: 1.0236
      },
      {
        base: { key: 'GBP', label: 'British Pound' },
        target: { key: 'EUR', label: 'Euro' },
        baseToTargetRate: 1.1651
      },
      {
        base: { key: 'JPY', label: 'Japanese Yen' },
        target: { key: 'USD', label: 'US Dollar' },
        baseToTargetRate: 0.00647
      },
      {
        base: { key: 'USD', label: 'US Dollar' },
        target: { key: 'CHF', label: 'Swiss Franc' },
        baseToTargetRate: 0.9073
      },
      {
        base: { key: 'CAD', label: 'Canadian Dollar' },
        target: { key: 'GBP', label: 'British Pound' },
        baseToTargetRate: 0.5827
      }
    ]
  };
  customTheme = { primary: '#0d47a1', secondary: '#ff6f00', background: '#fefefe', surface: '#f5f5f5' };
  labels = {
    title: 'Währungsrechner',
    updated: 'Aktualisiert',
    justNow: 'gerade eben',
    minute: 'Minute',
    minutes: 'Minuten',
    hour: 'Stunde',
    hours: 'Stunden',
    yesterday: 'gestern',
    days: 'Tage'
  };
  private getRandomDate() {
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const randomTime = twoHoursAgo.getTime() + Math.random() * (now.getTime() - twoHoursAgo.getTime());
    return new Date(randomTime);
  }
}
