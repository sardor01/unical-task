export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .split(' ')
    .join('-')
    .replace(/--/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
};
