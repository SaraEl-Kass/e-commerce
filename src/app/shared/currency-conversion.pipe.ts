import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'currencyConversion',
})
export class CurrencyConversionPipe implements PipeTransform {
  private exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
  }

  transform(value: number, targetCurrency: string): string {
    if (!value) return ''
    const rate = this.exchangeRates[targetCurrency.toUpperCase()]
    if (!rate) return 'Invalid currency'
    const convertedValue = value * rate
    return `${targetCurrency.toUpperCase()} ${convertedValue.toFixed(2)}`
  }
}
