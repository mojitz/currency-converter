import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-currency-converter',
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatCardModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    base: 'EUR' as 'EUR' | 'USD' | 'CHF' | 'GBP',
    target: 'USD' as 'USD' | 'CHF' | 'GBP' | 'JPY' | 'CAD',
    amount: 1,
  });
  protected readonly rates = {
    EUR: { USD: 1.0766, CHF: 0.9769, GBP: 0.8583 },
    USD: { JPY: 154.527 },
    CHF: { USD: 1.1021 },
    GBP: { CAD: 1.7162 },
  };
  protected readonly Object = Object;

}
