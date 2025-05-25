# Currency Converter Web Component

A customizable and accessible currency converter web component built with Angular. It supports theming, localization, and accepts custom currency data.

## Usage

```html
<app-currency-converter
  [currenciesMetaData]="yourCurrencyData"
  [theme]="{ primary: '#000', background: '#fff' }"
  [labels]="{ title: 'My Converter', updated: 'Last Updated' }">
</app-currency-converter>
```

## Inputs

| Name               | Type                                     | Required | Default                                                                                      | Description |
|--------------------|------------------------------------------|----------|----------------------------------------------------------------------------------------------|-------------|
| `currenciesMetaData` | `CurrencyRate`                          | Yes      | –                                                                                            | Currency data with rates and timestamps. See structure below. |
| `theme`            | `Partial<themeColors>`                   | No       | `{ primary: #dae6f9, secondary: #03dac6, background: #0d2853, surface: #365482 }`            | Customize tool colors. Can also be overridden with CSS custom properties. |
| `labels`           | `Partial<Record<...>>` (see below)       | No       | See default label values below                                                               | Localize or override static text like title and timestamps. |

## CurrencyRate structure

```ts
interface CurrencyRateEntry {
  base: { key: string; label: string };
  target: { key: string; label: string };
  baseToTargetRate: number;
}

interface CurrencyRate {
  rates: CurrencyRateEntry[];
  updatedAt: string | Date;
}
```

## Label Keys

These can be partially overridden:

| Key         | Default          | Purpose                                  |
|-------------|------------------|------------------------------------------|
| `title`     | Currency Converter | Component heading                        |
| `updated`   | Updated           | Timestamp prefix                         |
| `justNow`   | just now          | 0-minute fallback                        |
| `minute`    | minute ago        | Singular minute                          |
| `minutes`   | minutes ago       | Plural minutes                           |
| `hour`      | hour ago          | Singular hour                            |
| `hours`     | hours ago         | Plural hours                             |
| `yesterday` | yesterday         | 1-day fallback                           |
| `days`      | days ago          | Plural days                              |

## Styling

You can also override styling using CSS variables scoped to the component:

```css
app-currency-converter {
  --primary: #222;
  --secondary: #08d;
  --background: #fefefe;
  --surface: #ddd;
}
```

## Accessibility

- Keyboard accessible
- ARIA roles and labels
- WCAG AA compliant color defaults (can be customized)

## Integration

The component uses Shadow DOM encapsulation and is easy to embed in any modern framework or static HTML.
