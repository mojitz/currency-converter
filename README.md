# Currency Converter Web Component

A customizable and accessible currency converter web component built with Angular. It supports theming, localization, and accepts custom currency data.

## Usage

```html
<currency-converter
        [currenciesMetaData]="yourCurrencyData"
        [theme]="{ primary: '#000', background: '#fff' }"
        [labels]="{ title: 'My Converter', updated: 'Last Updated' }">
</currency-converter>
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

| Key         | Default          | Purpose                      |
|-------------|------------------|------------------------------|
| `title`     | Currency Converter | Component heading            |
| `updated`   | Updated           | Timestamp prefix             |
| `justNow`   | just now          | 0-minute fallback            |
| `minute`    | minute ago        | Singular minute              |
| `minutes`   | minutes ago       | Plural minutes               |
| `hour`      | hour ago          | Singular hour                |
| `hours`     | hours ago         | Plural hours                 |
| `yesterday` | yesterday         | 1-day fallback               |
| `days`      | days ago          | Plural days                  |
| `noData`    | Exchange rate data could not be found. | Fallback when no rate is available |

## Styling

You can customize the component's appearance using two methods:

### 1. Theming via Input

Set colors programmatically using the `theme` input:

```html
<currency-converter
  [theme]="{
    primary: '#111',
    secondary: '#0af',
    background: '#fff',
    surface: '#eee'
  }">
</currency-converter>
```

### 2. CSS Custom Properties

Use CSS variables to control appearance without touching the input API:

```css
currency-converter {
  --primary: #111;
  --secondary: #0af;
  --background: #fff;
  --surface: #eee;

  --border-radius: 0.5rem;
  --padding: 1rem;
  --font-family: 'Arial', sans-serif;
  --input-height: 2.5rem;
  --font-size: 0.9rem;
  --field-gap: 0.5rem;
}
```

These override the component's SCSS variables for deeper layout control.

## Accessibility

- Keyboard accessible
- ARIA roles and labels
- WCAG AA compliant color defaults (can be customized)

## Integration

The component uses Shadow DOM encapsulation and is easy to embed in any modern framework or static HTML.

## Build Instructions

To generate the single bundle:

```bash
npm run build:bundle
```

This will output a `main.js` bundle file in `dist/browser`.

You can then use it like this in your HTML:

```html
<script src="./main.js"></script>

<currency-converter></currency-converter>
```
