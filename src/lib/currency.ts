export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatCurrencyInput(value: string): string {
  const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));
  if (isNaN(numberValue)) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(numberValue);
}