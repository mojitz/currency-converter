import {Component, inject, signal, computed, input, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, NonNullableFormBuilder} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatOptionModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {toSignal as rxToSignal} from '@angular/core/rxjs-interop';

export interface CurrencyRateEntry {
  base: { key: string; label: string };
  target: { key: string; label: string };
  baseToTargetRate: number;
}

export interface CurrencyRate {
  rates: CurrencyRateEntry[];
  updatedAt: string | Date | undefined;
}

@Component({
  selector: 'app-currency-converter',
  imports: [CommonModule,
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
  currenciesMetaData = input<CurrencyRate>();
  rates = computed(() => this.currenciesMetaData()?.rates);
  uniqueCurrencies = computed(() => {
    const map = new Map<string, string>();
    if (!this.rates) {
      return [];
    }
    for (const rate of this.rates() ?? []) {
      map.set(rate.base.key, rate.base.label);
      map.set(rate.target.key, rate.target.label);
    }
    return Array.from(map.entries()).map(([key, label]) => ({key, label}));
  });
  private fb = inject(NonNullableFormBuilder);

  public get filteredBaseCurrencies() {
    const target = this.form.value.target;
    return this.uniqueCurrencies().filter(c =>
      (c.key !== target || c.key === this.form.value.base) &&
      this.hasRate(c.key, target)
    );
  };

  public get filteredTargetCurrencies() {
    const base = this.form.value.base;
    return this.uniqueCurrencies().filter(c =>
      (c.key !== base || c.key === this.form.value.target) &&
      this.hasRate(base, c.key)
    );
  };
  readonly relativeUpdateTime = computed(() => {
    const raw = this.currenciesMetaData()?.updatedAt;
    if (!raw) return '';
    return this.getRelativeTime(new Date(raw));
  });
  readonly localUpdateTime = computed(() => {
    const raw = this.currenciesMetaData()?.updatedAt;
    return raw ? new Date(raw).toLocaleString() : '';
  });
  form = this.fb.group({
    base: 'EUR' as string,
    target: 'USD' as string,
    baseAmount: 1,
    targetAmount: 1,
  });
  readonly base = rxToSignal(this.form.controls.base.valueChanges, {
    initialValue: this.form.controls.base.value,
  });

  readonly target = rxToSignal(this.form.controls.target.valueChanges, {
    initialValue: this.form.controls.target.value,
  });

  readonly baseAmount = rxToSignal(this.form.controls.baseAmount.valueChanges, {
    initialValue: this.form.controls.baseAmount.value,
  });

  readonly targetAmount = rxToSignal(this.form.controls.targetAmount.valueChanges, {
    initialValue: this.form.controls.targetAmount.value,
  });
  activeField = signal<'base' | 'target'>('base');

  constructor() {
    effect(() => {
      const base = this.base();
      const target = this.target();
      const rate = this.getRate(base, target);
      if (!rate) console.warn('No rate found for', base, target);
      if (!rate) return;

      if (this.activeField() === 'base') {
        const baseAmt = this.baseAmount();
        this.form.patchValue({
          targetAmount: +(baseAmt * rate).toFixed(4),
        }, {emitEvent: false});
      }

      if (this.activeField() === 'target') {
        const targetAmt = this.targetAmount();
        this.form.patchValue({
          baseAmount: +(targetAmt / rate).toFixed(4),
        }, {emitEvent: false});
      }
    });
  }
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute(s) ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hour(s) ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day(s) ago`;
  }
  private hasRate(base: string | undefined, target: string | undefined): boolean {
    return this.rates()?.some(r => r.base.key === base && r.target.key === target) ?? false;
  }
  private getRate(base: string, target: string): number | undefined {
    return (
      this.rates()?.find(
        (r) => r.base.key === base && r.target.key === target
      )?.baseToTargetRate ?? undefined
    );
  }
}
