import {Component, inject, signal, computed, input, effect,ViewEncapsulation,HostBinding} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, NonNullableFormBuilder} from '@angular/forms';

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
export interface themeColors {
  primary?: string;
  secondary?: string;
  background?: string;
  surface?: string;
}

@Component({
  selector: 'app-currency-converter',
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss'
})
export class CurrencyConverterComponent {
  currenciesMetaData = input<CurrencyRate>();
  theme = input<themeColors>();
  labels = input<Partial<Record<
    'title' | 'updated' |
    'justNow' | 'minute' | 'minutes' |
    'hour' | 'hours' | 'yesterday' | 'days' | 'noData',
    string
  >>>({
    title: 'Currency Converter',
    updated: 'Updated',
    justNow: 'just now',
    minute: 'minute ago',
    minutes: 'minutes ago',
    hour: 'hour ago',
    hours: 'hours ago',
    yesterday: 'yesterday',
    days: 'days ago',
    noData: 'Exchange rate data could not be found.'
  });
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
  filterCurrencies(excludeKey: string | undefined, direction: 'base' | 'target') {
   if (!excludeKey) return [];
    return this.uniqueCurrencies().filter(c => {
      const pairBase = direction === 'base' ? c.key : this.form.value.base;
      const pairTarget = direction === 'target' ? c.key : this.form.value.target;
      return (c.key !== excludeKey || c.key === this.form.value[direction]) &&
        this.hasRate(pairBase, pairTarget);
    });
  }
  @HostBinding('style.--primary') primaryColor = '';
  @HostBinding('style.--secondary') secondaryColor = '';
  @HostBinding('style.--background') backgroundColor = '';
  @HostBinding('style.--surface') surfaceColor = '';
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
      this.updateConvertedAmount(this.base(), this.target(), this.activeField());
      const theme = this.theme() ?? {};
      this.primaryColor = theme.primary ?? '';
      this.secondaryColor = theme.secondary ?? '';
      this.backgroundColor = theme.background ?? '';
      this.surfaceColor = theme.surface ?? '';
    });
  }
  updateConvertedAmount(base: string, target: string, active: 'base' | 'target') {
    const rate = this.getRate(base, target);
    if (!rate) return;

    if (active === 'base') {
      const baseAmt = this.baseAmount();
      this.form.patchValue({
        targetAmount: +(baseAmt * rate).toFixed(4),
      }, { emitEvent: false });
    } else {
      const targetAmt = this.targetAmount();
      this.form.patchValue({
        baseAmount: +(targetAmt / rate).toFixed(4),
      }, { emitEvent: false });
    }
  }
  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const l = this.labels();

    if (diffMinutes < 1) return l.justNow ?? 'just now';
    if (diffMinutes < 2) return `1 ${l.minute ?? 'minute ago'}`;
    if (diffMinutes < 60) return `${diffMinutes} ${l.minutes ?? 'minutes ago'}`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 2) return `1 ${l.hour ?? 'hour ago'}`;
    if (diffHours < 24) return `${diffHours} ${l.hours ?? 'hours ago'}`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 2) return l.yesterday ?? 'yesterday';
    return `${diffDays} ${l.days ?? 'days ago'}`;
  }
  private hasRate(base: string | undefined, target: string | undefined): boolean {
    return this.rates()?.some(r => r.base.key === base && r.target.key === target) ?? false;
  }
  protected getRate(base: string |undefined, target: string|undefined): number | undefined {
    return (
      this.rates()?.find(
        (r) => r.base.key === base && r.target.key === target
      )?.baseToTargetRate ?? undefined
    );
  }
}
