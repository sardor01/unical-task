export const formatPrice = (number?: string | number, n = 2, x = 3, s = ',', c = '.') => {
  if (!number || Number.isNaN(Number(number))) return '0';

  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\D' : '$'})`;
  const num = Number(number).toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), `$&${s || ','}`);
};

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .split(' ')
    .join('-')
    .replace(/--/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
};
